import FeatureCard from './FeatureCard';

const features = [
    {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Garantía de Calidad',
        description: 'Todos nuestros productos pasan por estrictos controles de calidad.'
    },
    {
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Envío Rápido',
        description: 'Recibe tu pedido en 24-48 horas con envío express disponible.'
    },
    {
        icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
        title: 'Soporte 24/7',
        description: 'Atención al cliente disponible en cualquier momento.'
    }
];

export default function Features() {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}