import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowRight,BarChart2, TrendingUp,PieChart, LineChart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Body = () => {
  return (
    <div>
      <main className='flex-1'>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-2">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Excel Data Into Powerful Visualizations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Turn complex spreadsheets into clear, actionable insights with our advanced Excel data visualization
                    platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                    size="lg"
                    asChild
                  >
                    <Link href="#pricing">Analyze Your Data</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">
                      See Examples
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                src=" ././utils/graph-example.jpg "
                width={1000}
                height={704}
                alt="Dashboard with Excel charts and graphs"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Excel Analysis Made Simple</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools to help you extract insights from your Excel data without complex formulas or coding.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                    <BarChart2 className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Interactive Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create stunning interactive charts and graphs from your Excel data with just a few clicks.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                    <TrendingUp className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatically identify trends and patterns in your data to make better business decisions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                    <PieChart className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Custom Dashboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Build beautiful, shareable dashboards that update automatically when your data changes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                    <LineChart className="h-6 w-6 text-teal-700" />
                  </div>
                  <CardTitle>Data Forecasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use advanced algorithms to predict future trends based on your historical Excel data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Body
