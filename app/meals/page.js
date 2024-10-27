import Link from "next/link";

export default function Meals() {
  return (
    <main>
        <div>Discover our meals</div>
        <p>
            <Link href="/meals/share">share a meal!</Link>
        </p>
         <p>
            <Link href="/meals/meal-1">Meal 1</Link>
        </p>
        <p>
            <Link href="/meals/meal-2">Meal 2</Link>
        </p>
    </main>
  )
}

