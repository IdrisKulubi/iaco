export default function OnboardinngPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Aboard!
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Let's get you set up for success.
          </p>
        </div>
        
        {/* Placeholder for onboarding steps/form */}
        <div className="text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            this will be the onboarding form/steps
          </p>
        </div>

        <button
          type="button"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
