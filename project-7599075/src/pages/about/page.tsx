import { motion } from 'framer-motion';
import PageNavbar from '../../components/feature/PageNavbar';
import Footer from '../home/components/Footer';

import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20portrait%20of%20confident%20female%20CEO%20in%20modern%20office%20setting%20with%20natural%20lighting%2C%20wearing%20elegant%20business%20attire%2C%20warm%20smile%2C%20contemporary%20corporate%20environment%20with%20minimalist%20design%20elements%20and%20soft%20neutral%20tones&width=400&height=500&seq=about-ceo-001&orientation=portrait',
      bio: 'Former VP at Fortune 500 tech company with 15+ years of experience in AI and data analytics.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20portrait%20of%20Asian%20male%20technology%20executive%20in%20modern%20tech%20office%2C%20wearing%20smart%20casual%20attire%2C%20confident%20expression%2C%20contemporary%20workspace%20with%20clean%20design%20and%20natural%20lighting&width=400&height=500&seq=about-cto-001&orientation=portrait',
      bio: 'PhD in Machine Learning from MIT. Previously led engineering teams at leading AI startups.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20portrait%20of%20Hispanic%20female%20product%20manager%20in%20contemporary%20office%20space%2C%20wearing%20modern%20business%20casual%20clothing%2C%20friendly%20demeanor%2C%20bright%20workspace%20with%20minimalist%20aesthetic%20and%20soft%20lighting&width=400&height=500&seq=about-product-001&orientation=portrait',
      bio: 'Product visionary with a track record of launching successful B2B SaaS products used by millions.'
    },
    {
      name: 'David Park',
      role: 'Head of Design',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20portrait%20of%20male%20creative%20director%20in%20modern%20design%20studio%2C%20wearing%20stylish%20contemporary%20attire%2C%20artistic%20background%20with%20clean%20lines%2C%20natural%20lighting%20and%20neutral%20color%20palette&width=400&height=500&seq=about-design-001&orientation=portrait',
      bio: 'Award-winning designer who has shaped the user experience for top-tier enterprise software.'
    }
  ];

  const values = [
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation First',
      description: 'We constantly push boundaries to deliver cutting-edge solutions that transform how businesses operate.'
    },
    {
      icon: 'ri-team-line',
      title: 'Customer Success',
      description: 'Your success is our success. We\'re committed to providing exceptional support and value at every step.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Trust & Security',
      description: 'We prioritize data security and privacy, ensuring your information is always protected and compliant.'
    },
    {
      icon: 'ri-rocket-line',
      title: 'Continuous Growth',
      description: 'We believe in constant improvement, both for our product and our team, to better serve you.'
    }
  ];

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!THREE || !canvasContainerRef.current) return;

      const container = canvasContainerRef.current;
      const scene = new THREE.Scene();
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      const camera = new THREE.PerspectiveCamera(
        30,
        containerWidth / containerHeight,
        1,
        10000
      );
      camera.position.set(20, 10, 20);
      camera.lookAt(scene.position);
      scene.add(camera);

      const clock = new THREE.Clock();
      const timeUniform = {
        iGlobalTime: { type: 'f', value: 0.1 },
        iResolution: { 
          type: 'v2', 
          value: new THREE.Vector2(containerWidth, containerHeight) 
        }
      };

      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float iGlobalTime;
        uniform vec2 iResolution;

        const int NUM_STEPS = 8;
        const float PI = 3.1415;
        const float EPSILON = 1e-3;

        const int ITER_GEOMETRY = 3;
        const int ITER_FRAGMENT = 5;
        const float SEA_HEIGHT = 0.6;
        const float SEA_CHOPPY = 1.0;
        const float SEA_SPEED = 1.0;
        const float SEA_FREQ = 0.16;
        const vec3 SEA_BASE = vec3(0.1,0.19,0.22);
        const vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6);
        mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);

        float hash(vec2 p) {
          float h = dot(p,vec2(127.1,311.7));
          return fract(sin(h)*43758.5453123);
        }

        float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return -1.0 + 2.0 * mix(
            mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
            mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
            u.y
          );
        }

        float diffuse(vec3 n,vec3 l,float p) {
          return pow(dot(n,l) * 0.4 + 0.6,p);
        }

        float specular(vec3 n,vec3 l,vec3 e,float s) {
          float nrm = (s + 8.0) / (3.1415 * 8.0);
          return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
        }

        vec3 getSkyColor(vec3 e) {
          e.y = max(e.y, 0.0);
          vec3 ret;
          ret.x = pow(1.0 - e.y, 2.0);
          ret.y = 1.0 - e.y;
          ret.z = 0.6+(1.0 - e.y) * 0.4;
          return ret;
        }

        float sea_octave(vec2 uv, float choppy) {
          uv += noise(uv);
          vec2 wv = 1.0 - abs(sin(uv));
          vec2 swv = abs(cos(uv));
          wv = mix(wv, swv, wv);
          return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
        }

        float map(vec3 p) {
          float freq = SEA_FREQ;
          float amp = SEA_HEIGHT;
          float choppy = SEA_CHOPPY;
          vec2 uv = p.xz;
          uv.x *= 0.75;
          float SEA_TIME = iGlobalTime * SEA_SPEED;

          float d, h = 0.0;
          for(int i = 0; i < ITER_GEOMETRY; i++) {
            d = sea_octave((uv + SEA_TIME) * freq, choppy);
            d += sea_octave((uv - SEA_TIME) * freq, choppy);
            h += d * amp;
            uv *= octave_m;
            freq *= 1.9;
            amp *= 0.22;
            choppy = mix(choppy, 1.0, 0.2);
          }
          return p.y - h;
        }

        float map_detailed(vec3 p) {
          float freq = SEA_FREQ;
          float amp = SEA_HEIGHT;
          float choppy = SEA_CHOPPY;
          vec2 uv = p.xz;
          uv.x *= 0.75;
          float SEA_TIME = iGlobalTime * SEA_SPEED;

          float d, h = 0.0;
          for(int i = 0; i < ITER_FRAGMENT; i++) {
            d = sea_octave((uv+SEA_TIME) * freq, choppy);
            d += sea_octave((uv-SEA_TIME) * freq, choppy);
            h += d * amp;
            uv *= octave_m;
            freq *= 1.9;
            amp *= 0.22;
            choppy = mix(choppy,1.0,0.2);
          }
          return p.y - h;
        }

        vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {
          float fresnel = 1.0 - max(dot(n,-eye),0.0);
          fresnel = pow(fresnel,3.0) * 0.65;

          vec3 reflected = getSkyColor(reflect(eye,n));
          vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12;

          vec3 color = mix(refracted,reflected,fresnel);

          float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
          color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;

          color += vec3(specular(n,l,eye,60.0));

          return color;
        }

        vec3 getNormal(vec3 p, float eps) {
          vec3 n;
          n.y = map_detailed(p);
          n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
          n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
          n.y = eps;
          return normalize(n);
        }

        float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {
          float tm = 0.0;
          float tx = 1000.0;
          float hx = map(ori + dir * tx);

          if(hx > 0.0) {
            return tx;
          }

          float hm = map(ori + dir * tm);
          float tmid = 0.0;
          for(int i = 0; i < NUM_STEPS; i++) {
            tmid = mix(tm,tx, hm/(hm-hx));
            p = ori + dir * tmid;
            float hmid = map(p);
            if(hmid < 0.0) {
              tx = tmid;
              hx = hmid;
            } else {
              tm = tmid;
              hm = hmid;
            }
          }
          return tmid;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          uv = uv * 2.0 - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          float time = iGlobalTime * 0.3;

          vec3 ang = vec3(sin(time*3.0)*0.1,sin(time)*0.2+0.3,time);
          vec3 ori = vec3(0.0,3.5,time*5.0);
          vec3 dir = normalize(vec3(uv.xy,-2.0));
          dir.z += length(uv) * 0.15;
          dir = normalize(dir);

          vec3 p;
          heightMapTracing(ori,dir,p);
          vec3 dist = p - ori;
          float EPSILON_NRM = 0.1 / iResolution.x;
          vec3 n = getNormal(p, dot(dist,dist) * EPSILON_NRM);
          vec3 light = normalize(vec3(0.0,1.0,0.8));

          vec3 color = mix(
            getSkyColor(dir),
            getSeaColor(p,n,light,dir,dist),
            pow(smoothstep(0.0,-0.05,dir.y),0.3)
          );

          gl_FragColor = vec4(pow(color,vec3(0.75)), 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms: timeUniform,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      const water = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(containerWidth, containerHeight, 40),
        material
      );
      water.position.y = 0;
      scene.add(water);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(containerWidth, containerHeight);
      container.appendChild(renderer.domElement);

      const handleResize = () => {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        timeUniform.iResolution.value.x = newWidth;
        timeUniform.iResolution.value.y = newHeight;
      };

      window.addEventListener('resize', handleResize);

      const animate = () => {
        timeUniform.iGlobalTime.value += clock.getDelta();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
      };
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-brand-beige-light">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-caprasimo mb-6 text-brand-black">
              Building the future of business intelligence
            </h1>
            <p className="text-xl text-brand-grey max-w-3xl mx-auto">
              We're on a mission to empower every organization with AI-powered insights that drive smarter decisions and accelerate growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-caprasimo mb-6 text-brand-black">Our mission</h2>
              <p className="text-lg text-brand-grey mb-6 leading-relaxed">
                At Find Your Tribe, we believe every interaction tells a story. Our mission is to help businesses decode these stories through cutting-edge artificial intelligence, transforming raw data into actionable insights that drive meaningful connections with customers.
              </p>
              <p className="text-lg text-brand-grey leading-relaxed">
                We're not just another analytics platform – we're your strategic partner in understanding the human element behind every data point.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=professional%20diverse%20team%20of%20AI%20researchers%20and%20data%20scientists%20collaborating%20around%20holographic%20displays%20showing%20neural%20networks%20and%20data%20patterns%2C%20modern%20tech%20startup%20office%20environment%20with%20warm%20beige%20and%20green%20natural%20tones%2C%20clean%20minimalist%20aesthetic%2C%20natural%20lighting&width=600&height=400&seq=about-mission-v3&orientation=landscape"
                alt="Our team working on AI solutions"
                className="w-full h-80 object-cover object-top rounded-2xl border border-brand-beige"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-caprasimo mb-6 text-brand-black">Our values</h2>
            <p className="text-lg text-brand-grey max-w-3xl mx-auto">
              These core principles guide everything we do at Find Your Tribe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-heart-line",
                title: "Human-Centric",
                description: "We put people at the center of everything we build, ensuring our AI enhances human understanding rather than replacing it."
              },
              {
                icon: "ri-shield-check-line",
                title: "Privacy First",
                description: "Your data security and privacy are paramount. We implement enterprise-grade security measures to protect what matters most."
              },
              {
                icon: "ri-lightbulb-line",
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI, delivering cutting-edge solutions that stay ahead of the curve."
              },
              {
                icon: "ri-team-line",
                title: "Collaboration",
                description: "We believe the best insights come from working together, fostering partnerships that drive mutual success."
              },
              {
                icon: "ri-bar-chart-line",
                title: "Transparency",
                description: "Our AI models are explainable and transparent, so you always understand how insights are generated."
              },
              {
                icon: "ri-rocket-line",
                title: "Excellence",
                description: "We strive for excellence in every aspect of our platform, from user experience to technical performance."
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-brand-beige-light rounded-xl p-8 border border-brand-beige hover:border-brand-brown transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <i className={`${value.icon} text-2xl text-brand-green`}></i>
                </div>
                <h3 className="text-xl font-caprasimo text-brand-black mb-4">{value.title}</h3>
                <p className="text-brand-grey leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-caprasimo mb-6 text-brand-black">Meet our team</h2>
            <p className="text-lg text-brand-grey max-w-3xl mx-auto">
              The talented individuals driving innovation at Find Your Tribe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Founder",
                bio: "Former VP of AI at Google with 15+ years in AI research and product development. PhD in Machine Learning from Stanford.",
                image: "https://readdy.ai/api/search-image?query=professional%20executive%20Asian%20woman%20CEO%20portrait%20headshot%20in%20elegant%20business%20attire%2C%20warm%20confident%20smile%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20friendly%20atmosphere%2C%20square%20format%20professional%20photography%20with%20cozy%20welcoming%20feel&width=400&height=400&seq=team-sarah-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              },
              {
                name: "Marcus Johnson",
                role: "Chief Technology Officer",
                bio: "Ex-Principal Engineer at Microsoft Azure. Expert in scalable AI infrastructure and distributed systems architecture.",
                image: "https://readdy.ai/api/search-image?query=professional%20executive%20African%20American%20man%20CTO%20portrait%20headshot%20in%20smart%20business%20attire%2C%20confident%20warm%20expression%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20friendly%20atmosphere%2C%20square%20format%20professional%20photography%20with%20cozy%20welcoming%20feel&width=400&height=400&seq=team-marcus-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Head of AI Research",
                bio: "Former Research Scientist at OpenAI. PhD in Cognitive Psychology and pioneer in human-AI interaction and behavioral analytics.",
                image: "https://readdy.ai/api/search-image?query=professional%20scientist%20Hispanic%20woman%20portrait%20headshot%20in%20elegant%20business%20attire%2C%20intelligent%20warm%20smile%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20friendly%20atmosphere%2C%20square%20format%20professional%20photography%20with%20cozy%20welcoming%20feel&width=400&height=400&seq=team-emily-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              },
              {
                name: "David Kim",
                role: "Head of Product",
                bio: "Product leader with 10+ years building enterprise SaaS. Former Director of Product at Salesforce.",
                image: "https://readdy.ai/api/search-image?query=professional%20product%20executive%20Asian%20man%20portrait%20headshot%20in%20smart%20casual%20business%20attire%2C%20friendly%20warm%20smile%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20welcoming%20atmosphere%2C%20square%20format%20professional%20photography%20with%20cozy%20feel&width=400&height=400&seq=team-david-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              },
              {
                name: "Rachel Thompson",
                role: "VP of Engineering",
                bio: "Engineering leader from Amazon Web Services. Specialist in building high-performance distributed systems at scale.",
                image: "https://readdy.ai/api/search-image?query=professional%20engineering%20executive%20Caucasian%20woman%20portrait%20headshot%20in%20modern%20business%20attire%2C%20confident%20warm%20expression%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20friendly%20atmosphere%2C%20square%20format%20professional%20photography%20with%20cozy%20welcoming%20feel&width=400&height=400&seq=team-rachel-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              },
              {
                name: "James Okonkwo",
                role: "Head of Customer Success",
                bio: "Customer success expert with deep experience in B2B SaaS. Previously led CS teams at HubSpot and Zendesk.",
                image: "https://readdy.ai/api/search-image?query=professional%20customer%20success%20executive%20African%20man%20portrait%20headshot%20in%20business%20attire%2C%20warm%20friendly%20welcoming%20smile%2C%20village%20community%20aesthetic%20style%2C%20soft%20natural%20lighting%2C%20warm%20beige%20and%20brown%20tones%20solid%20background%2C%20approachable%20cozy%20atmosphere%2C%20square%20format%20professional%20photography%20with%20inviting%20feel&width=400&height=400&seq=team-james-village-v2&orientation=squarish",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-caprasimo text-brand-black mb-2">{member.name}</h3>
                  <p className="text-brand-brown mb-4 font-semibold">{member.role}</p>
                  <p className="text-brand-grey text-sm leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="flex items-center gap-4">
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-brand-beige-light hover:bg-brand-green rounded-lg transition-all group/icon cursor-pointer"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <i className="ri-linkedin-fill text-xl text-brand-black group-hover/icon:text-white"></i>
                    </a>
                    <a 
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-brand-beige-light hover:bg-brand-green rounded-lg transition-all group/icon cursor-pointer"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <i className="ri-twitter-x-fill text-xl text-brand-black group-hover/icon:text-white"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-caprasimo mb-6 text-brand-black">By the numbers</h2>
            <p className="text-lg text-brand-grey">
              Our impact in transforming business intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Users", icon: "ri-user-line" },
              { number: "500M+", label: "Data Points Processed", icon: "ri-database-line" },
              { number: "99.9%", label: "Uptime", icon: "ri-time-line" },
              { number: "150+", label: "Countries Served", icon: "ri-global-line" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-3xl text-brand-green`}></i>
                </div>
                <div className="text-3xl font-bold text-brand-black mb-2">{stat.number}</div>
                <div className="text-brand-grey">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-beige-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div>
            <h2 className="text-5xl font-caprasimo text-brand-black mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-lg text-brand-grey mb-10 max-w-2xl mx-auto">
              Join thousands of companies already using Find Your Tribe to unlock deeper customer insights and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="/" className="bg-brand-green hover:bg-brand-green-light text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap shadow-lg">
                Get Started Today
              </a>
              <a href="/features" className="bg-white hover:bg-brand-beige text-brand-black px-10 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap border border-brand-beige">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
