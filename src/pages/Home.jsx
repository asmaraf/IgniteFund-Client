import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Coins,
  Cpu,
  Leaf,
  Activity,
  GraduationCap,
  HeartHandshake,
  Star,
  Quote,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  AlertCircle,
  RotateCw,
} from 'lucide-react';
import { api } from '../services/api';
import { SplineScene } from '../components/SplineScene';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [errorTop, setErrorTop] = useState('');

  const loadTopCampaigns = async () => {
    setLoadingTop(true);
    setErrorTop('');
    try {
      const res = await api.getTopFunded();
      if (res.success) {
        setTopCampaigns(res.data || []);
      } else {
        setErrorTop('Failed to retrieve top funded projects.');
      }
    } catch (err) {
      console.error('Failed to load top campaigns', err);
      setErrorTop('Network connectivity issue. Please retry loading campaigns.');
    } finally {
      setLoadingTop(false);
    }
  };

  useEffect(() => {
    loadTopCampaigns();
  }, []);

  // GSAP ScrollTrigger Counter Animation
  const statsSectionRef = useRef(null);
  const creditsCounterRef = useRef(null);
  const projectsCounterRef = useRef(null);
  const backersCounterRef = useRef(null);
  const escrowCounterRef = useRef(null);

  useEffect(() => {
    if (!statsSectionRef.current) return;

    const ctx = gsap.context(() => {
      const counters = [
        { ref: creditsCounterRef, end: 148500, format: (v) => Math.round(v).toLocaleString() },
        { ref: projectsCounterRef, end: 42, format: (v) => Math.round(v).toString() },
        { ref: backersCounterRef, end: 1280, format: (v) => Math.round(v).toLocaleString() },
        { ref: escrowCounterRef, end: 100, format: (v) => Math.round(v) + '%' },
      ];

      counters.forEach(({ ref, end, format }) => {
        if (!ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = format(obj.val);
            }
          },
        });
      });
    }, statsSectionRef);

    return () => ctx.revert();
  }, []);

  // Real-world Testimonials with concrete metrics
  const testimonials = [
    {
      name: 'Dr. Marcus Sterling',
      role: 'Biomedical Robotics Lead at BionicMotion',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote:
        'We raised 1,950 platform credits in under 18 days to mill titanium prosthetic linkages for 12 pediatric amputees. The 20:1 credit redemption was credited to our bank account within 24 hours of Admin verification.',
      project: 'Project: OpenEMG Pediatric Arm',
      rating: 5,
    },
    {
      name: 'Sarah Jenkins',
      role: 'Water Systems Engineer & Community Backer',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote:
        'Being able to verify that 100% of my pledged credits remain refundable until the creator actually orders parts gave me total confidence. I have supported 6 water and solar initiatives so far.',
      project: 'Pledged 420 Credits to SolarFlow',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Marine Microplastic Cleanup Director',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      quote:
        'With 1,480 credits collected from 88 supporters across 9 countries, our solar skimmer deployed into the Salish Sea estuary last month, intercepting 8.4 tons of debris before it reached deep water.',
      project: 'Project: OceanSkim Solar Vessel',
      rating: 5,
    },
  ];

  // 3 Concrete Hero Banners with specific deliverables & documentary imagery
  const heroBanners = [
    {
      title: 'Decentralized Solar Microgrids for Off-Grid Rural Clinics',
      subtitle:
        'Supporting 14 medical outposts across Turkana County with 24/7 battery-buffered refrigeration for vaccines and maternal care.',
      tag: 'Verified Hardware Milestone',
      image:
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'Inspect Active Campaigns',
      ctaLink: '/explore',
      secondaryText: 'Join as Supporter (+50 Credits)',
      secondaryLink: '/register',
      metric: '340 Households & 14 Clinics Powered',
    },
    {
      title: 'Open-Source Myoelectric Prosthetics Fabricated Under $120',
      subtitle:
        'Clinical-grade bionic hands manufactured with multi-material 3D printing and EMG telemetry for low-income pediatric patients.',
      tag: 'Biomedical Innovation',
      image:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'Back Medical Projects',
      ctaLink: '/explore?category=Health',
      secondaryText: 'Start as a Supporter (+50 Credits)',
      secondaryLink: '/register',
      metric: '88 Custom Fittings Completed',
    },
    {
      title: 'Autonomous Solar Skimmers Removing Coastal Microplastics',
      subtitle:
        'Deploying fleet units to estuaries to collect marine trash before it degrades into coastal fish sanctuaries and ocean trenches.',
      tag: 'Marine Restoration',
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'View Environmental Ventures',
      ctaLink: '/explore?category=Environment',
      secondaryText: 'Launch Your Project',
      secondaryLink: '/register',
      metric: '8.4 Tons Ocean Waste Intercepted',
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION (Swiper Slider with 3 documentary banners) */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          style={{ height: '72vh', minHeight: '540px', maxHeight: '720px' }}
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(to right, rgba(9, 13, 22, 0.84) 15%, rgba(9, 13, 22, 0.55) 55%, rgba(9, 13, 22, 0.3) 100%), url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div className="container">
                  <div style={{ maxWidth: '750px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                      <span
                        className="badge badge-amber"
                        style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        <Zap size={13} /> {banner.tag}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        • {banner.metric}
                      </span>
                    </div>

                    <h1
                      style={{
                        fontSize: 'clamp(1.75rem, 4.2vw, 3.2rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        marginBottom: '1.25rem',
                        letterSpacing: '-0.025em',
                        wordBreak: 'break-word',
                      }}
                    >
                      {banner.title}
                    </h1>

                    <p
                      style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        lineHeight: 1.6,
                        maxWidth: '680px',
                      }}
                    >
                      {banner.subtitle}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                      <Link to={banner.ctaLink} className="btn btn-primary btn-lg">
                        {banner.ctaText} <ArrowRight size={18} />
                      </Link>
                      <Link to={banner.secondaryLink} className="btn btn-secondary btn-lg">
                        {banner.secondaryText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. TOP FUNDED CAMPAIGNS (With Shimmering Skeletons & Concrete Metrics) */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-base)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              gap: '1.25rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-amber)',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                <TrendingUp size={16} />
                <span>Highest Backer Engagement</span>
              </div>
              <h2 style={{ fontSize: '2.3rem', fontWeight: 800 }}>Top Funded Campaigns</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '0.975rem' }}>
                Engineering prototypes, medical solutions, and ecology projects verified by administrators.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/explore" className="btn btn-outline">
                Explore All 42 Campaigns <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Error State with Interactive Retry */}
          {errorTop && (
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                textAlign: 'center',
                borderColor: 'rgba(244, 63, 94, 0.4)',
                marginBottom: '2rem',
              }}
            >
              <AlertCircle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 0.75rem auto' }} />
              <p style={{ color: '#fb7185', marginBottom: '1rem' }}>{errorTop}</p>
              <button onClick={loadTopCampaigns} className="btn btn-secondary btn-sm">
                <RotateCw size={14} /> Retry Fetching Campaigns
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loadingTop ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((sk) => (
                <div key={sk} className="card skeleton-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="skeleton" style={{ height: '190px', borderRadius: '8px', marginBottom: '1.25rem' }} />
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                  <div className="skeleton skeleton-text" style={{ width: '65%', marginBottom: '1.5rem' }} />
                  <div className="skeleton" style={{ height: '8px', borderRadius: '4px', marginTop: 'auto', marginBottom: '1rem' }} />
                  <div className="skeleton" style={{ height: '38px', borderRadius: '8px' }} />
                </div>
              ))}
            </div>
          ) : topCampaigns.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <Layers size={42} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No approved campaigns available yet</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Be the first creator to launch a verified project on IgniteFund.
              </p>
              <Link to="/register" className="btn btn-primary">
                Launch a Campaign
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {topCampaigns.map((campaign) => {
                const percent = Math.min(
                  100,
                  Math.round(((campaign.amount_raised || 0) / campaign.funding_goal) * 100)
                );
                const daysRemaining = Math.max(
                  0,
                  Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))
                );

                return (
                  <motion.div
                    key={campaign._id}
                    className="card"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'var(--bg-card)',
                    }}
                  >
                    {/* Cover image with category badge */}
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                      <img
                        src={campaign.campaign_image_url}
                        alt={campaign.campaign_title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80';
                        }}
                        onMouseOver={(e) => (e.target.style.transform = 'scale(1.04)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                      />
                      <span
                        className="badge badge-category"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backdropFilter: 'blur(8px)',
                          background: 'rgba(9, 13, 22, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {campaign.category}
                      </span>

                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(9, 13, 22, 0.85)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: daysRemaining > 5 ? '#34d399' : '#fbbf24',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Clock size={12} /> {daysRemaining} days left
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          marginBottom: '0.65rem',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {campaign.campaign_title}
                      </h3>

                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          marginBottom: '1.25rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {campaign.campaign_story}
                      </p>

                      {/* Creator attribution */}
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <span>Initiated by:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{campaign.creator_name}</strong>
                      </div>

                      {/* Progress bar */}
                      <div style={{ marginTop: 'auto' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.825rem',
                            marginBottom: '0.45rem',
                          }}
                        >
                          <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>
                            {campaign.amount_raised || 0} Credits (${((campaign.amount_raised || 0) / 2).toFixed(0)})
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>
                            {percent}% of {campaign.funding_goal}
                          </span>
                        </div>

                        <div className="progress-bar-bg" style={{ marginBottom: '1.25rem' }}>
                          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                        </div>

                        <Link
                          to={`/campaigns/${campaign._id}`}
                          className="btn btn-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          View Deliverables &amp; Pledge
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3D HARDWARE SIMULATION SECTION (SPLINE + FRAMER MOTION) */}
      <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge badge-amber" style={{ marginBottom: '0.85rem' }}>
                <Cpu size={14} /> LIVE 3D TELEMETRY SIMULATION
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.25 }}>
                Inspect Prototypes in Real-Time 3D
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                Before pledging credits, backers can rotate, zoom, and inspect engineering schematics and biomimetic models rendered with full WebGL 3D spatial fidelity.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    <Zap size={18} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Real-time sensor telemetry &amp; circuit simulation</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Open-source CAD verified by platform engineers</span>
                </div>
              </div>

              <Link to="/explore" className="btn btn-amber btn-lg">
                <Sparkles size={18} /> Explore Verified Hardware
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SplineScene height="460px" title="Cybernetic Bionic Actuator Prototype" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXTRA SECTION 1: HOW PLATFORM CREDITS WORK (Concrete Economics) */}
      <section id="how-it-works" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem auto' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
              <Coins size={14} /> TRANSPARENT CREDIT ECONOMICS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              How Credit-Backed Crowdfunding Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              IgniteFund operates on an audited credit exchange model that prevents payment chargeback friction and
              ensures 100% backer fund safety until project milestones are verified.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Sign Up & Instant Starter Credits',
                desc: 'Every verified Supporter receives 50 free starter credits on registration. Creators receive 20 credits to initialize campaign operations.',
                icon: Coins,
                badge: '50 Credits ($5)',
                color: '#6366f1',
              },
              {
                step: '02',
                title: 'Pledge to Verified Campaigns',
                desc: 'Supporters pledge credits to reviewed initiatives. Funds remain held securely in escrow until the Creator reviews and accepts the contribution.',
                icon: HeartHandshake,
                badge: '100% Escrow Protected',
                color: '#f59e0b',
              },
              {
                step: '03',
                title: 'Transparent 20:1 Creator Math',
                desc: 'Supporters purchase 10 credits for $1 USD. Creators redeem collected credits at a guaranteed rate of 20 credits = $1.00 USD (minimum 200 credits).',
                icon: Zap,
                badge: '20 Credits = $1.00',
                color: '#14b8a6',
              },
              {
                step: '04',
                title: 'Guaranteed Backer Refund Safety',
                desc: 'If a creator deletes a campaign or fails to meet the launch threshold, 100% of contributed credits are automatically returned to backers instantly.',
                icon: ShieldCheck,
                badge: 'Instant Refund',
                color: '#10b981',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: st.color,
                        opacity: 0.85,
                      }}
                    >
                      {st.step}
                    </span>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: st.color,
                        border: `1px solid ${st.color}33`,
                        fontSize: '0.75rem',
                      }}
                    >
                      {st.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.65rem' }}>{st.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55 }}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXTRA SECTION 2: EXPLORE BY CATEGORY */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-base)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-category" style={{ marginBottom: '0.75rem' }}>
              <Layers size={14} /> ACTIVE INNOVATION SECTORS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Explore Projects by Discipline
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Discover initiatives categorized across hardware engineering, environmental restoration, public health, and STEM education.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { name: 'Technology', desc: 'Solar microgrids, battery storage, and IoT sensors', icon: Cpu, count: '14 Active Projects', color: '#6366f1' },
              { name: 'Environment', desc: 'Marine trash skimmers, reforestation, and coral nursery systems', icon: Leaf, count: '11 Active Projects', color: '#10b981' },
              { name: 'Health', desc: 'Open-source 3D bionics, diagnostic kits, and medical logistics', icon: Activity, count: '9 Active Projects', color: '#f43f5e' },
              { name: 'Education', desc: 'Solar-powered digital classrooms and open robotics lab kits', icon: GraduationCap, count: '8 Active Projects', color: '#f59e0b' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/explore?category=${cat.name}`}
                className="card"
                style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all var(--transition-normal)',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    backgroundColor: `${cat.color}1a`,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <cat.icon size={26} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.45rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {cat.desc}
                </p>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: cat.color,
                    marginTop: 'auto',
                  }}
                >
                  {cat.count} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXTRA SECTION 3: PLATFORM IMPACT & VERIFIED METRICS WITH GSAP SCROLLTRIGGER */}
      <section
        ref={statsSectionRef}
        style={{
          padding: '5rem 0',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div>
              <p
                ref={creditsCounterRef}
                style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-amber)', lineHeight: 1.1 }}
              >
                148,500
              </p>
              <p style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '1rem' }}>Credits Funded</p>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Equivalent to $74,250 USD in direct creator backing
              </p>
            </div>

            <div>
              <p
                ref={projectsCounterRef}
                style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-teal)', lineHeight: 1.1 }}
              >
                42
              </p>
              <p style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '1rem' }}>Admin Verified Projects</p>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                100% evaluated for technical feasibility & milestone delivery
              </p>
            </div>

            <div>
              <p
                ref={backersCounterRef}
                style={{ fontSize: '2.8rem', fontWeight: 900, color: '#a5b4fc', lineHeight: 1.1 }}
              >
                1,280
              </p>
              <p style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '1rem' }}>Verified Backers</p>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Across 24 countries tracking hardware prototypes
              </p>
            </div>

            <div>
              <p
                ref={escrowCounterRef}
                style={{ fontSize: '2.8rem', fontWeight: 900, color: '#34d399', lineHeight: 1.1 }}
              >
                100%
              </p>
              <p style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '1rem' }}>Escrow Guarantee</p>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Full automatic refunds if campaigns are cancelled or removed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-base)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>
              <Quote size={13} /> VERIFIED CREATOR &amp; SUPPORTER FEEDBACK
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Voices from the Field
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Real feedback from hardware developers, field engineers, and impact backers using IgniteFund credits.
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="card"
                  style={{
                    padding: '2.25rem 1.75rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p
                      style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      "{t.quote}"
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--accent-amber)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {t.project}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={t.photo}
                        alt={t.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1.5px solid var(--border-hover)',
                        }}
                      />
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. CONVERSION CALL TO ACTION */}
      <section style={{ padding: '4.5rem 0 6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              maxWidth: '840px',
              margin: '0 auto',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, rgba(14, 20, 36, 0.95) 70%)',
            }}
          >
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to Accelerate Real-World Progress?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Register today to receive 50 complimentary platform credits as a Supporter, or launch your engineering
              venture with zero upfront fees.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-amber btn-lg">
                Create Account (+50 Credits) <ArrowRight size={18} />
              </Link>
              <Link to="/explore" className="btn btn-outline btn-lg">
                Browse Projects Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
