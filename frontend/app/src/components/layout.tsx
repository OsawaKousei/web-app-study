import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {sidebar && (
        <aside
          style={{
            width: "250px",
            backgroundColor: "#f0f2f5",
            padding: "1rem",
          }}
        >
          {sidebar}
        </aside>
      )}
      <main style={{ flex: 1, padding: "2rem", backgroundColor: "#fff" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
