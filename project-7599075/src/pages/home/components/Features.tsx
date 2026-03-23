
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export default function Features() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const barData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 85 },
    { name: 'Thu', value: 92 },
    { name: 'Fri', value: 88 },
    { name: 'Sat', value: 95 },
    { name: 'Sun', value: 82 }
  ];

  const lineData = [
    { month: 'Jan', actual: 45, predicted: 45 },
    { month: 'Feb', actual: 52, predicted: 52 },
    { month: 'Mar', actual: 61, predicted: 61 },
    { month: 'Apr', actual: 68, predicted: 68 },
    { month: 'May', actual: 75, predicted: 75 },
    { month: 'Jun', actual: 82, predicted: 82 },
    { month: 'Jul', actual: null, predicted: 89 },
    { month: 'Aug', actual: null, predicted: 95 },
    { month: 'Sep', actual: null, predicted: 102 }
  ];

  const pieData = [
    { name: 'Website', value: 45, color: '#1f2937' },
    { name: 'Social Media', value: 30, color: '#374151' },
    { name: 'Email', value: 25, color: '#4b5563' }
  ];

  const areaData = [
    { month: 'Jan', users: 1200, engagement: 850 },
    { month: 'Feb', users: 1900, engagement: 1300 },
    { month: 'Mar', users: 2400, engagement: 1800 },
    { month: 'Apr', users: 3100, engagement: 2400 },
    { month: 'May', users: 3800, engagement: 3000 },
    { month: 'Jun', users: 4500, engagement: 3600 }
  ];

  const features = [
    {
      icon: 'ri-pie-chart-line',
      title: 'Behavioral Pattern Analysis',
      description: 'Discover hidden patterns in how customers interact with your business. Our AI analyzes millions of data points to reveal meaningful behavioral insights that drive engagement and loyalty.',
      highlights: [
        'Advanced pattern recognition algorithms',
        'Real-time behavioral tracking',
        'Predictive customer modeling'
      ],
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Real-Time Interaction Mapping',
      description: 'Visualize customer journeys as they happen. Track every touchpoint, understand decision-making processes, and identify opportunities to enhance the human experience in real-time.',
      highlights: [
        'Live interaction dashboards',
        'Multi-channel journey tracking',
        'Instant insight generation'
      ],
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip />
            <Bar dataKey="value" fill="#1f2937" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      icon: 'ri-emotion-line',
      title: 'Sentiment Intelligence',
      description: 'Go beyond numbers to understand emotions. Our advanced sentiment analysis interprets customer feelings, satisfaction levels, and emotional triggers across all communication channels.',
      highlights: [
        'Natural language processing',
        'Emotion detection and analysis',
        'Cross-channel sentiment tracking'
      ],
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={areaData}>
            <XAxis dataKey="month" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#1f2937" 
              strokeWidth={3}
              dot={{ fill: '#1f2937', r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="#6b7280" 
              strokeWidth={3}
              dot={{ fill: '#6b7280', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Predictive Engagement Insights',
      description: 'Anticipate customer needs before they arise. Machine learning models predict future behaviors, helping you proactively create personalized experiences that resonate with each individual.',
      highlights: [
        'AI-powered forecasting',
        'Behavior prediction models',
        'Proactive engagement triggers'
      ],
      chart: (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis dataKey="month" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#1f2937" 
              strokeWidth={3}
              dot={{ fill: '#1f2937', r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#6b7280" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#6b7280', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-caprasimo mb-6 text-brand-black">
            Powerful Features
          </h2>
          <p className="text-xl text-brand-grey max-w-3xl mx-auto">
            Everything you need to transform raw data into actionable insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-brand-beige-light rounded-2xl p-8 hover:bg-white border-2 border-brand-beige hover:border-brand-green transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-green/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-xl mb-6 group-hover:bg-brand-green group-hover:scale-110 transition-all shadow-md">
                  <i className={`${feature.icon} text-3xl text-brand-green group-hover:text-white transition-colors`}></i>
                </div>
                
                <h3 className="text-2xl font-caprasimo mb-4 text-brand-black group-hover:text-brand-green transition-colors">
                  {feature.title}
                </h3>
                <p className="text-brand-grey leading-relaxed mb-6">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-3 text-brand-grey">
                      <div className="w-5 h-5 flex items-center justify-center bg-brand-green/10 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-xs text-brand-green"></i>
                      </div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
