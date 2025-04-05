import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PricingTier {
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  billingPeriod: 'monthly' | 'yearly'
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 29,
    billingPeriod: 'monthly',
    description: 'Perfect for small institutions',
    features: [
      'Up to 200 students',
      'Basic scheduling',
      'Email support',
      'Basic reporting',
      'Mobile app access',
      '2 admin users',
      'Community support'
    ]
  },
  {
    name: 'Professional',
    price: 79,
    billingPeriod: 'monthly',
    description: 'Ideal for growing institutions',
    highlighted: true,
    features: [
      'Up to 1000 students',
      'Advanced scheduling',
      'Priority email & chat support',
      'Advanced analytics',
      'Mobile app access',
      '10 admin users',
      'API access',
      'Custom integrations',
      'Dedicated account manager'
    ]
  },
  {
    name: 'Enterprise',
    price: 199,
    billingPeriod: 'monthly',
    description: 'For large institutions',
    features: [
      'Unlimited students',
      'AI-powered scheduling',
      '24/7 phone & email support',
      'Custom analytics',
      'White-label mobile app',
      'Unlimited admin users',
      'Full API access',
      'Custom development',
      'Dedicated success team',
      'On-premise deployment'
    ]
  }
]

const frequentlyAskedQuestions = [
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card required.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no hidden fees. The price you see is what you pay.'
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const getYearlyPrice = (monthlyPrice: number) => {
    // 20% discount for yearly billing
    return Math.round(monthlyPrice * 12 * 0.8)
  }

  return (
      <div className="min-h-screen-without-nav bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section with 3D floating elements */}
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative mb-20"
          >
            {/* Floating decoration elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <motion.div
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeInOut"
                  }}
                  className="absolute top-10 left-20 w-16 h-16 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-xl"
              />
              <motion.div
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -8, 0],
                    rotate: [0, -3, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-10 right-20 w-20 h-20 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-xl"
              />
              <motion.div
                  animate={{
                    y: [0, -12, 0],
                    x: [0, -7, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 9,
                    ease: "easeInOut"
                  }}
                  className="absolute top-40 right-40 w-12 h-12 bg-yellow-500/20 dark:bg-yellow-500/30 rounded-full blur-lg"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl transform -skew-y-2"></div>
              <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 mask-gradient"></div>
            </div>

            <div className="relative py-12 px-4">
            <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4">
              Pricing
            </span>
              <h1 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Simple, Transparent Pricing
              </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Choose the perfect plan for your institution. All plans include a 14-day free trial.
              </p>

              {/* Billing toggle */}
              <div className="mt-8 inline-flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        billingPeriod === 'monthly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                  Monthly
                </button>
                <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        billingPeriod === 'yearly'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                  Yearly
                  <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                  Save 20%
                </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Pricing Tiers with more interactive elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
                <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-2xl overflow-hidden
                bg-white dark:bg-gray-800 border-2 ${
                        tier.highlighted
                            ? 'border-purple-500/50 dark:border-purple-500/70'
                            : 'border-transparent'
                    }
                hover:border-purple-500/80 dark:hover:border-purple-400/80
                shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                transform hover:-translate-y-2 transition-all duration-300`}
                    whileHover={{
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                    }}
                >
                  {tier.highlighted && (
                      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  )}

                  {tier.highlighted && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold py-1.5 px-4 rounded-bl-xl">
                        Most Popular
                      </div>
                  )}

                  <div className="p-8 h-full flex flex-col">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tier.description}
                      </p>
                    </div>

                    <div className="mb-8 flex items-baseline">
                      <motion.span
                          key={`${tier.name}-${billingPeriod}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                      >
                        ${billingPeriod === 'monthly' ? tier.price : getYearlyPrice(tier.price)}
                      </motion.span>
                      <span className="ml-2 text-base text-gray-500 dark:text-gray-400">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                    </div>

                    <ul className="mb-8 space-y-4 flex-grow">
                      {tier.features.map((feature, featureIndex) => (
                          <motion.li
                              key={featureIndex}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.05 }}
                          >
                            <svg
                                className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${
                                    tier.highlighted
                                        ? 'text-purple-500 dark:text-purple-400'
                                        : 'text-blue-500 dark:text-blue-400'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                          </motion.li>
                      ))}
                    </ul>

                    <div className="flex justify-center">
                      <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={`w-[160px] py-3 px-6 rounded-lg font-semibold text-base 
                      ${tier.highlighted
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                              : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                          }
                      text-white transition-all duration-200 text-center
                      shadow-sm hover:shadow-md`}
                      >
                        Get Started
                      </motion.button>
                    </div>

                    <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
                      No credit card required
                    </p>
                  </div>
                </motion.div>
            ))}
          </div>

          {/* Feature comparison section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mb-20 bg-white dark:bg-gray-800 rounded-xl p-6
            border border-gray-100 dark:border-gray-700
            shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Compare All Features
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-4 text-left text-gray-500 dark:text-gray-400 font-medium">Feature</th>
                  <th className="py-4 px-4 text-center text-gray-900 dark:text-white font-medium">Basic</th>
                  <th className="py-4 px-4 text-center text-purple-600 dark:text-purple-400 font-medium">Professional</th>
                  <th className="py-4 px-4 text-center text-gray-900 dark:text-white font-medium">Enterprise</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Students</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Up to 200</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Up to 1000</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Support</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Email</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Priority email & chat</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">24/7 phone & email</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Admin users</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">2</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">10</td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">API access</td>
                  <td className="py-3 px-4 text-center">
                    <svg className="w-5 h-5 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg className="w-5 h-5 mx-auto text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg className="w-5 h-5 mx-auto text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Section with accordion */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4">
              {frequentlyAskedQuestions.map((faq, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden
                  border border-gray-100 dark:border-gray-700
                  shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <svg
                          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
                              activeFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                          <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                              <p>{faq.answer}</p>
                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 p-10 rounded-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-0 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to transform your institution?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of educational institutions that trust our platform to manage their operations efficiently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg font-semibold text-base
                  bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600
                  text-white transition-all duration-200 shadow-md"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg font-semibold text-base
                  bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                  border border-gray-200 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  transition-all duration-200 shadow-sm"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  )
}