export default function FeatureCard({ feature }) {
    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                    </svg>
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
        </div>
    );
}