import LiveConsult from './page';

// This runs on the server (Zero latency to your DB/API)
async function getDoctors() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/live-consult`, {
        next: { revalidate: 60 } // Cache for 60 seconds
    });
    return res.json();
}

export default async function Page() {
    const initialData = await getDoctors();

    return (
        <main>
            {/* Pass the data here so the client component doesn't show a loading spinner */}
            <LiveConsult initialDoctors={initialData} />
        </main>
    );
}