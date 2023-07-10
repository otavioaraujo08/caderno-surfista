export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav>Ola</nav>
            <nav>Mundo</nav>
            <nav>Do Next</nav>

            {children}
        </section>
    );
}
