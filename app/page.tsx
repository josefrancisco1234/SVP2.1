import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">CatalogHub</h1>
          <div className="flex gap-4">
            <Button asChild variant="ghost">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/sign-up">Create Store</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Create Your Online Catalog in Minutes</h2>
          <p className="text-xl text-gray-600 mb-8">
            Build, manage, and share your product catalog with a unique link. Embed it anywhere with a single line of
            code.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-gray-900 text-center mb-16">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Easy Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Create your account and start adding products immediately. No technical knowledge required.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Unique Store URL</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get your own branded store URL to share with customers or partners easily.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Embed Anywhere</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Generate an embed code and paste it into any website to display your catalog.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Add, edit, and organize products with images, prices, descriptions, and categories.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Filter by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Organize products into categories for better browsing experience and product discovery.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Fully Responsive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Your catalog looks perfect on all devices - desktop, tablet, and mobile phones.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-16">How It Works</h3>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Create Your Store</h4>
                <p className="text-gray-600">
                  Sign up with your email and create your store name. We'll generate a unique URL for your catalog.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Add Products</h4>
                <p className="text-gray-600">
                  Upload your products with images, prices, descriptions, and organize them by category.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Share or Embed</h4>
                <p className="text-gray-600">
                  Share your store URL or copy the embed code to display your catalog on your website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 mb-8">
            Create your catalog today and start sharing your products with the world.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/auth/sign-up">Create Store Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 CatalogHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
