import Head from 'next/head'
import { useAuth } from 'contexts/AuthContext'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function Welcome() {
  const { user, signOut } = useAuth()

  return (
    <div>
      <Head>
        <title>Authority</title>
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome {user?.name}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                This was a test for the Authority made by Daniel Gomes.
              </h2>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={signOut}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
