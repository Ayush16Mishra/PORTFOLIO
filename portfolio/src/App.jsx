import './App.css';
import Welcome from './components/welcome.jsx';
import AboutMe from './components/aboutMe.jsx';
import MyProjects from './components/projects.jsx';
import ContactMe from './components/contact.jsx';
import Squares from './components/Squares.jsx';
import ExperienceVertical from './components/ExperienceVertical.jsx';
import PillNav from './components/pillNav.jsx'; 


function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* 🟣 Global Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor="#444"
          hoverFillColor="#555"
        />
      </div>

      {/* 🔆 Navigation */}
      <div className="relative z-20">
        <PillNav
          logo="/logo.png" // put your logo path here
          items={[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
          ]}
          activeHref={window.location.hash || "#home"}
        />
      </div>

      {/* 🔆 Main Content */}
      <div className="relative z-10">
        <section id="home"><Welcome /></section>
        
        <section id="about"><AboutMe /></section>

        <section id="experience"><ExperienceVertical /></section>
        <section id="projects"><MyProjects /></section>
        <section id="contact"><ContactMe /></section>
        
      </div>
    </div>
  );
}

export default App;
