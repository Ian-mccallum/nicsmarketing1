export default function TestPage() {
  return (
    <div style={{ 
      padding: '20px', 
      color: 'white', 
      backgroundColor: 'black',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Test Page</h1>
      <p>If you can see this, the routing is working correctly!</p>
      <a href="/" style={{ color: 'white', textDecoration: 'underline' }}>
        Back to Home
      </a>
    </div>
  );
} 