import { 
  ShieldCheckIcon, 
  TruckIcon, 
  ArrowPathIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline'

const assurances = [
  {
    icon: ShieldCheckIcon,
    title: 'Premium Quality',
    description: 'Handcrafted from finest Italian leather with lifetime warranty on craftsmanship.',
  },
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'Complimentary shipping on orders above ₹2,999. Express delivery available.',
  },
  {
    icon: ArrowPathIcon,
    title: 'Easy Returns',
    description: '30-day hassle-free returns and exchanges. No questions asked.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '24/7 Support',
    description: 'Dedicated customer support via chat, email, and phone. Always here to help.',
  },
]

export default function AssuranceTiles() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-950 mb-4">
            The Velmont Promise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We stand behind every product with guarantees that matter to you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {assurances.map((assurance, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-900 text-white rounded-full mb-4">
                <assurance.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-amber-950 mb-3">
                {assurance.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {assurance.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}