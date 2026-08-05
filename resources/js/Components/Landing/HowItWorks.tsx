const steps = [
    {
        icon: '📝',
        title: 'Create',
        description: 'Share your favorite recipes with the community.',
    },
    {
        icon: '⭐',
        title: 'Rate',
        description: 'Help others discover the best recipes.',
    },
    {
        icon: '🍳',
        title: 'Cook',
        description: 'Try new meals and share your experience.',
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-stone-50 py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
                    How RecipeHub Works
                </h2>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.title}
                            className="rounded-2xl bg-white p-8 text-center dark:bg-slate-900"
                        >
                            <div className="text-4xl">{step.icon}</div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-slate-600 dark:text-slate-300">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
