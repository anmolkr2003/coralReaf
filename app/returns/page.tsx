import ReturnRequestForm from "@/components/ReturnRequestForm"

export default function ReturnPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Return & Replacment Center</h1>

      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📝 Submit a Return Request</h2>
        <ReturnRequestForm />
      </section>
    </main>
  )
}
