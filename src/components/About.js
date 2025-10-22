import React from 'react';

const About = () => {
  return (
    <>
      <section className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="mb-4">About Kapeko Coffee</h2>
            <p className="lead">
              Born from a passion for authentic Filipino coffee culture, Kapeko brings you 
              the finest Barako beans from the heart of Batangas.
            </p>
            <p>
              Our story began in 2020 when we discovered the rich, bold flavors of locally 
              grown coffee beans. We believe that great coffee starts with great beans, 
              which is why we work directly with local farmers to ensure the highest quality 
              and freshest taste.
            </p>
            <p>
              At Kapeko, we're not just serving coffee – we're preserving and celebrating 
              the rich coffee heritage of the Philippines. Every cup tells a story of tradition, 
              quality, and the warm hospitality that Filipinos are known for.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Coffee shop interior"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h3 className="text-center mb-4">Our Values</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center p-4 h-100">
              <div className="coffee-bean mb-3" style={{fontSize: '3rem'}}>🌱</div>
              <h5>Sustainability</h5>
              <p>We support eco-friendly farming practices and fair trade principles.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4 h-100">
              <div className="coffee-cup mb-3" style={{fontSize: '3rem'}}>☕</div>
              <h5>Quality</h5>
              <p>Only the finest beans make it to your cup, carefully selected and roasted.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-4 h-100">
              <div className="mb-3" style={{fontSize: '3rem'}}>🤝</div>
              <h5>Community</h5>
              <p>We build lasting relationships with local farmers and our customers.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-3">
        <p>© 2025 Kapeko PH | Crafted with Love in the Philippines</p>
      </footer>
    </>
  );
};

export default About;
