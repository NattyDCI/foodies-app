import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <div style={{diplay:"flex", flexDirection:"column"}}>
        <p>
          <Link style={{textDecoration:"none", color:"white"}} href="/meals" >Meals</Link>
        </p>
        <p>
            <Link href="/meals/share">share a meal!</Link>
        </p>
        <p>
          <Link style={{textDecoration:"none", color:"white"}} href="/community" >Community</Link>
        </p>
      </div>
     

    </main>
  );
}
