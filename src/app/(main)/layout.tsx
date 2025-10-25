import NavBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}