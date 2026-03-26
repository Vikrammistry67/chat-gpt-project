import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            width: '100%',
            height: '60px', // Fixed small height
            backgroundColor: 'black',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap' // Ensures it doesn't break on tiny screens
            }}>

                {/* Left: Branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '20px', height: '20px',
                        background: '#10b981', borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 'bold', color: 'white'
                    }}>V</div>
                    <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
                        © {year} <span style={{ color: 'white', fontWeight: '600' }}>Vikram GPT</span>
                    </p>
                </div>

                {/* Center: Disclaimer (Hidden on very small phones to save space) */}
                <p className="hidden sm:block" style={{ color: '#475569', fontSize: '11px', margin: 0 }}>
                    AI-generated content may be inaccurate.
                </p>

                {/* Right: Socials */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <a href="https://github.com/Vikrammistry67" target="_blank" rel="noreferrer"
                        style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '12px' }}>
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/vikram-mistry-6bb944250" target="_blank" rel="noreferrer"
                        style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '12px' }}>
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;