import '../styles/globals.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">{children}</div>
    </div>
  );
};

export default Layout;
