import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  Palette,
  Star,
  Quote,
} from 'lucide-react';
import { api } from '../services/api';

export const Home = () => {
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    const loadTopCampaigns = async () => {
      try {
        const res = await api.getTopFunded();
        if (res.success) {
          setTopCampaigns(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load top campaigns', err);
      } finally {
        setLoadingTop(false);
      }
    };
    loadTopCampaigns();
  }, []);

  // Static Testimonials for Swiper Slider
  const testimonials = [
    {
      name: 'Elena Vance',
      role: 'Impact Supporter',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote:
        'IgniteFund completely demystified crowdfunding for me. Backing the clean water project with platform credits gave me direct tracking of how every single credit moved the needle for those villages.',
      rating: 5,
    },
    {
      name: 'Dr. Marcus Sterling',
      role: 'Creator & Engineer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote:
        'As a roboticist, traditional venture pitching took months. On IgniteFund, our pediatric bionic hand received 1,950 credits within 18 days. The 20:1 withdrawal system was seamless.',
      rating: 5,
    },
    {
      name: 'Amina Al-Mansoor',
      role: 'Environmental Backer',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      quote:
        'The verification standards set by IgniteFund are superior. Knowing that campaigns are reviewed before going live gave me total confidence in pledging credits.',
      rating: 5,
    },
  ];

  // 3 Hero Banners
  const heroBanners = [
    {
      title: 'Power Innovations That Shape Tomorrow',
      subtitle: 'Back world-changing technology, clean energy, and healthcare with platform credits.',
      tag: 'Next-Gen Crowdfunding',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'Explore Groundbreaking Projects',
      ctaLink: '/explore',
    },
    {
      title: 'Fuel Grassroots Community & Environmental Impact',
      subtitle: 'From coral reef restoration to urban micro-farms, make your pledges count.',
      tag: 'Sustainable Action',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'Discover Green Initiatives',
      ctaLink: '/explore?category=Environment',
    },
    {
      title: 'Launch Your Vision With Global Supporter Backing',
      subtitle: 'Creators earn credits, engage backers directly, and withdraw funds with zero friction.',
      tag: 'Creator Empowerment',
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'Launch a Campaign Today',
      ctaLink: '/register',
    },
  ];

  return (
    <div>
      {/* 1. HERO SECTION (Swiper Slider with 3 banners) */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          style={{ height: '70vh', minHeight: '520px', maxHeight: '680px' }}
        >
          {heroBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `linear-gradient(rgba(10, 14, 26, 0.75), rgba(10, 14, 26, 0.95)), url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div className="container">
                  <div style={{ maxWidth: '720px' }}>
                    <span
                      className="badge badge-category"
                      style={{ marginBottom: '1.25rem', padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
                    >
                      <Sparkles size={14} /> {banner.tag}
                    </span>
                    <h1
                      style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.15,
                        marginBottom: '1.25rem',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {banner.title}
                    </h1>
                    <p
                      style={{
                        fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {banner.subtitle}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      <Link to={banner.ctaLink} className="btn btn-primary btn-lg">
                        {banner.ctaText} <ArrowRight size={18} />
                      </Link>
                      <Link to="/register" className="btn btn-secondary btn-lg">
                        Join as Supporter (+50 Credits)
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. TOP FUNDED CAMPAIGNS (Top 6 campaigns with cover, title, amount raised) */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <TrendingUp size={18} />
                <span>COMMUNITY FAVORITES</span>
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Top Funded Campaigns</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Groundbreaking projects that have gathered the maximum support from our global backers.
              </p>
            </div>
            <Link to="/explore" className="btn btn-outline">
              View All Campaigns <ArrowRight size={16} />
            </Link>
          </div>

          {loadingTop ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--border-subtle)',
                  borderTopColor: 'var(--primary)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
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
                const percent = Math.min(100, Math.round(((campaign.amount_raised || 0) / campaign.funding_goal) * 100));
                return (
                  <div key={campaign._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
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
                        onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                      />
                      <span
                        className="badge badge-category"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backdropFilter: 'blur(8px)',
                          background: 'rgba(10, 14, 26, 0.8)',
                        }}
                      >
                        {campaign.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          marginBottom: '0.75rem',
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
                          fontSize: '0.875rem',
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

                      {/* Progress bar */}
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                            {campaign.amount_raised || 0} Credits Raised
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>{percent}% of {campaign.funding_goal}</span>
                        </div>
                        <div className="progress-bar-bg" style={{ marginBottom: '1.25rem' }}>
                          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                        </div>

                        <Link
                          to={`/campaigns/${campaign._id}`}
                          className="btn btn-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          View Details & Pledge
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. EXTRA SECTION 1: HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem auto' }}>
            <span className="badge badge-category" style={{ marginBottom: '0.75rem' }}>
              <Zap size={14} /> SIMPLE 4-STEP CYCLE
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>How IgniteFund Works</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              A transparent, credit-backed crowdfunding architecture engineered for maximum trust between Creators and Backers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Join & Claim Credits',
                desc: 'Sign up in seconds. Supporters receive 50 complimentary credits immediately; Creators receive 20 starter credits.',
                icon: Coins,
                color: '#6366f1',
              },
              {
                step: '02',
                title: 'Verified Campaigns',
                desc: 'Creators build compelling pitches with rewards and goals. Every campaign is vetted by Admins before public launch.',
                icon: ShieldCheck,
                color: '#10b981',
              },
              {
                step: '03',
                title: 'Pledge Platform Credits',
                desc: 'Backers pledge credits toward projects they admire. Credits are securely held until the Creator reviews and approves.',
                icon: HeartHandshake,
                color: '#06b6d4',
              },
              {
                step: '04',
                title: '20:1 Creator Payouts',
                desc: 'Creators convert raised credits to real currency at 20 credits = $1 (min 200 credits) with automated Admin processing.',
                icon: TrendingUp,
                color: '#f59e0b',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {item.step}
                </span>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `rgba(${item.color === '#6366f1' ? '99,102,241' : item.color === '#10b981' ? '16,185,129' : item.color === '#06b6d4' ? '6,182,212' : '245,158,11'}, 0.15)`,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <item.icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXTRA SECTION 2: EXPLORE BY CATEGORY */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-category" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} /> EXPAND YOUR IMPACT
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>Explore by Category</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Target the issues and technological frontiers that inspire you the most.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { label: 'Technology', icon: Cpu, count: '14 Active', color: '#6366f1' },
              { label: 'Environment', icon: Leaf, count: '9 Active', color: '#10b981' },
              { label: 'Health', icon: Activity, count: '12 Active', color: '#f43f5e' },
              { label: 'Education', icon: GraduationCap, count: '8 Active', color: '#f59e0b' },
              { label: 'Community', icon: Users, count: '11 Active', color: '#06b6d4' },
              { label: 'Art', icon: Palette, count: '7 Active', color: '#a855f7' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={`/explore?category=${cat.label}`}
                className="card"
                style={{
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: `rgba(99, 102, 241, 0.12)`,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <cat.icon size={26} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>{cat.label}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXTRA SECTION 3: PLATFORM IMPACT IN NUMBERS */}
      <section
        style={{
          padding: '5rem 0',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-main) 100%)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> VERIFIED METRICS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>Platform Impact in Numbers</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Real metrics reflecting projects brought to life through community backed platform credits.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            {[
              { number: '148,200+', label: 'Platform Credits Funded', sub: '$7,410+ in project backing' },
              { number: '100%', label: 'Backer Refund Guarantee', sub: 'Instant refund on canceled campaigns' },
              { number: '420+', label: 'Verified Creators Funded', sub: 'Spanning 28 global regions' },
              { number: '24 hrs', label: 'Average Payout Review', sub: 'Swift admin withdrawal processing' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.number}
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{stat.label}</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL SECTION (Swiper Slider with static quotes, names, user photos) */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-category" style={{ marginBottom: '0.75rem' }}>
              <Quote size={14} /> VOICES OF OUR COMMUNITY
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>User Testimonials</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Hear how creators and supporters achieve real-world impact together on IgniteFund.
            </p>
          </div>

          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={30}
              slidesPerView={1}
            >
              {testimonials.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="glass-panel"
                    style={{
                      padding: '3rem 2.5rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1.5rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="#fbbf24" />
                      ))}
                    </div>

                    <p
                      style={{
                        fontSize: '1.2rem',
                        lineHeight: 1.7,
                        fontStyle: 'italic',
                        color: 'var(--text-primary)',
                        marginBottom: '2rem',
                        maxWidth: '680px',
                      }}
                    >
                      "{item.quote}"
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={item.photo}
                        alt={item.name}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          border: '2px solid var(--primary)',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.name}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section
        style={{
          padding: '4.5rem 0',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Bring Your Idea to the World?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Join thousands of innovators and supporters. Register today to claim your bonus platform credits and launch or back impactful initiatives.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Account (+50 Credits)
            </Link>
            <Link to="/explore" className="btn btn-secondary btn-lg">
              Explore Active Campaigns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
