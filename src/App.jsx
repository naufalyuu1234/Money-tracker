import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./components/ui/navigation-menu";

// Display
import Overview from "./display/dashboard/Overview";

// Dashboard link
const dashboardLinks = [
  { href: "/overview", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
];

// Main Link
const mainLinks = [
  { href: "/budgets", label: "Budgets" },
  { href: "/reports", label: "Reports" },
];


export default function App() {
  const location = useLocation();

  return (
    <div className="p-8">
      {/* Navbar */}
      <NavigationMenu>
        <NavigationMenuList>
          {/* Dashboard dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-[300px] bg-white shadow-lg rounded-md">
                {dashboardLinks.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink
                      href={link.href}
                      className={`block rounded-md px-3 py-2 transition ${
                        location.pathname === link.href
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Main Links */}
          {mainLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                href={link.href}
                className={`px-3 py-2 rounded-md transition ${
                  location.pathname === link.href
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Routes */}
      <Routes>
         <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview />} />
        {/* <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/reports" element={<Reports />} /> */}
      </Routes>
    </div>
  );
}