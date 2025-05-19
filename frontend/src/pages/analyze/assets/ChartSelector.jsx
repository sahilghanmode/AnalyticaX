import { BarChart, LineChart, PieChart, AreaChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ChartSelector({ viewMode, currentChart, onChartChange }) {
  const getChartIcon = () => {
    if (currentChart.includes("bar")) return <BarChart className="h-4 w-4 mr-2" />
    if (currentChart.includes("line")) return <LineChart className="h-4 w-4 mr-2" />
    if (currentChart.includes("pie")) return <PieChart className="h-4 w-4 mr-2" />
    if (currentChart.includes("area")) return <AreaChart className="h-4 w-4 mr-2" />
    return <BarChart className="h-4 w-4 mr-2" />
  }

  const getChartName = () => {
    if (currentChart === "bar") return "Bar Chart"
    if (currentChart === "line") return "Line Chart"
    if (currentChart === "pie") return "Pie Chart"
    if (currentChart === "doughnut") return "Doughnut Chart"
    return "Bar Chart"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          {getChartIcon()}
          {getChartName()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Chart Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onChartChange("bar")} className="cursor-pointer">
            <BarChart className="h-4 w-4 mr-2" />
            <span>Bar Chart</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChartChange("line")} className="cursor-pointer">
            <LineChart className="h-4 w-4 mr-2" />
            <span>Line Chart</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChartChange("pie")} className="cursor-pointer">
            <PieChart className="h-4 w-4 mr-2" />
            <span>Pie Chart</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChartChange("doughnut")} className="cursor-pointer">
            <PieChart className="h-4 w-4 mr-2" />
            <span>Doughnut Chart</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
