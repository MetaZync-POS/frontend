import Particles from "../components/Particles/Particles";
import AuthTabs from "../components/AuthTabs";
import { Container, Paper, Typography, Box } from "@mui/material";

const AuthPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    >
      {/* Auth Card Section */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "transparent",
            backdropFilter: "blur(8px)",
            border: "0.5px solid white",
            boxShadow: "0 8px 32px 0 rgba(135, 135, 137, 0.37)",
          }}
        >
          {/* Left Side: Image */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url("/authImage.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: { xs: 200, md: "100%" },
              display: { xs: "none", md: "block" },
            }}
          />

          {/* Right Side: Form */}
          <Box
            sx={{
              flex: 1,
              padding: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#ffffff" }}
            >
              Welcome to A.M POS
            </Typography>
            <AuthTabs />
          </Box>
        </Paper>
      </Container>

      {/* Particle Background */}
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </Box>
    </Box>
  );
};

export default AuthPage;
