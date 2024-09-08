import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const itineraries = {
  "San Francisco": [
    {
      time: "9:00 AM",
      name: "Breakfast at Blue Bottle Coffee",
      address: "66 Mint St, San Francisco, CA 94103",
      image: "/assets/blue-bottle-coffee.jpeg",
    },
    {
      time: "11:00 AM",
      name: "Relax at Dolores Park",
      address: "19th St & Dolores St, San Francisco, CA 94114",
      image: "/assets/dolores-park.jpg",
    },
    {
      time: "1:00 PM",
      name: "Lunch at Tartine Bakery",
      address: "600 Guerrero St, San Francisco, CA 94110",
      image: "/assets/tartine-bakery.jpg",
    },
  ],
  "New York City": [
    {
      time: "9:00 AM",
      name: "Breakfast at La Parisienne Bakery",
      address: "235 W 46th St, New York, NY 10036",
      image: "/assets/la-parisienne.jpg",
    },
    {
      time: "12:00 PM",
      name: "Lunch at Katz's Delicatessen",
      address: "205 E Houston St, New York, NY 10002",
      image: "/assets/katz-deli.jpg",
    },
    {
      time: "7:00 PM",
      name: "Dinner at Gramercy Tavern",
      address: "42 E 20th St, New York, NY 10003",
      image: "/assets/gramercy-tarvern.jpg",
    },
  ],
  "Los Angeles": [
    {
      time: "10:00 AM",
      name: "Brunch at Gjusta",
      address: "320 Sunset Ave, Venice, CA 90291",
      image: "/assets/gjusta.jpg",
    },
    {
      time: "12:00 PM",
      name: "Chill at Santa Monica Beach",
      address: "Santa Monica, CA",
      image: "/assets/santa-monica-pier.jpg",
    },
    {
      time: "3:00 PM",
      name: "Dinner at Nobu Malibu",
      address: "22706 Pacific Coast Hwy, Malibu, CA 90265",
      image: "/assets/nobu-malibu.jpg",
    },
  ],
};

const FeaturedItineraries = () => {
  const prompts = [
    {
      user: "Hey Poppy, the weather is nice this morning. I want to hang out in San Francisco. Please plan me a chill day.",
      poppy:
        "Sure, here is your itinerary for San Francisco. Hope you have a wonderful day!",
      city: "San Francisco",
    },
    {
      user: "Poppy, I’m in New York City and I want to explore some great food spots. Can you plan a foodie adventure?",
      poppy:
        "Sure, here is your itinerary for New York City. Enjoy your foodie adventure!",
      city: "New York City",
    },
    {
      user: "Hey Poppy, it’s sunny in LA. Can you plan a relaxing beach day with some good food nearby?",
      poppy:
        "Sure, here is your itinerary for Los Angeles. Have a great beach day!",
      city: "Los Angeles",
    },
  ];

  const [currentPrompt, setCurrentPrompt] = useState({});
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showPoppyResponse, setShowPoppyResponse] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    // Randomly select a prompt
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);

    // Handle sequence of messages
    const sequenceTimeout = setTimeout(() => setShowUserMessage(true), 8000); // 3s typing + 5s wait
    const responseTimeout = setTimeout(() => setShowPoppyResponse(true), 14000); // 3s typing + 3s wait + 5s user message
    const itineraryTimeout = setTimeout(() => setShowItinerary(true), 20000); // 3s delay after Poppy's response

    return () => {
      clearTimeout(sequenceTimeout);
      clearTimeout(responseTimeout);
      clearTimeout(itineraryTimeout);
    };
  }, []);

  const { user, poppy, city } = currentPrompt;

  return (
    // NORMAL SIZE

    //   <div className="featured-itineraries">
    //   <Typography
    //     variant="h3"
    //     sx={{ textAlign: "center", color: "#2f2f2f", fontWeight: 500, mb: 3 }}
    //   >
    //     Featured Itineraries
    //   </Typography>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       width: "100%",
    //       maxWidth: "1600px",
    //       margin: "0 auto",
    //       padding: 2,
    //       border: "1px solid #ddd",
    //       borderRadius: "8px",
    //       backgroundColor: "#212529",
    //       height: "400px",
    //       overflowY: "auto",
    //     }}
    //   >
    //     {/* Chat Box */}
    //     <Box
    //       sx={{
    //         bgcolor: "#212529",
    //         flex: 1,
    //         display: "flex",
    //         flexDirection: "column",
    //         width: "50%",
    //         padding: 2,
    //         borderRight: "1px solid #ddd",
    //         overflowY: "auto",
    //       }}
    //     >
    //       {/* Poppy's greeting */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           marginBottom: 2,
    //           padding: 2,
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             marginBottom: 1,
    //             padding: 1,
    //             backgroundColor: "#0083E0",
    //             borderRadius: "16px",
    //             maxWidth: "80%",
    //             alignSelf: "flex-start",
    //           }}
    //         >
    //           <Typography
    //             variant="body1"
    //             sx={{ color: "#fff", fontWeight: "500" }}
    //           >
    //             <TypeAnimation
    //               sequence={[
    //                 "Hi, I'm Poppy, your AI assistant to help plan your day.",
    //                 3000, // Typing time
    //               ]}
    //               wrapper="span"
    //               speed={50}
    //               cursor={false}
    //             />
    //           </Typography>
    //         </Box>

    //         {/* User's message */}
    //         {showUserMessage && (
    //           <Box
    //             sx={{
    //               display: "flex",
    //               alignItems: "center",
    //               marginBottom: 1,
    //               padding: 1,
    //               backgroundColor: "#B4B4B4",
    //               borderRadius: "16px",
    //               ml: 4,
    //               maxWidth: "70%",
    //               alignSelf: "flex-end",
    //               textAlign: "right",
    //             }}
    //           >
    //             <Typography
    //               variant="body1"
    //               sx={{ color: "#000000", fontWeight: "500" }}
    //             >
    //               <TypeAnimation
    //                 sequence={[
    //                   user,
    //                   5000, // Typing time
    //                 ]}
    //                 wrapper="span"
    //                 speed={50}
    //                 cursor={false} // Remove cursor
    //               />
    //             </Typography>
    //           </Box>
    //         )}

    //         {/* Poppy's final response */}
    //         {showPoppyResponse && (
    //           <Box
    //             sx={{
    //               display: "flex",
    //               alignItems: "center",
    //               marginBottom: 1,
    //               padding: 1,
    //               backgroundColor: "#0277bd",
    //               borderRadius: "16px",
    //               maxWidth: "60%",
    //               alignSelf: "flex-start",
    //             }}
    //           >
    //             <Typography
    //               variant="body1"
    //               sx={{ color: "#fff", fontWeight: "500" }}
    //             >
    //               <TypeAnimation
    //                 sequence={[
    //                   poppy,
    //                   3000, // Typing time
    //                 ]}
    //                 wrapper="span"
    //                 speed={50}
    //                 cursor={false} // Remove cursor
    //               />
    //             </Typography>
    //           </Box>
    //         )}
    //       </Box>
    //     </Box>

    //     {/* Itinerary List */}
    //     <Box
    //       sx={{
    //         bgcolor: "#212529",
    //         flex: 1,
    //         padding: 2,
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         overflowY: "auto",
    //       }}
    //     >
    //       {showItinerary ? (
    //         itineraries[city]?.map((item, index) => (
    //           <Card
    //             key={index}
    //             sx={{
    //               display: "flex",
    //               marginBottom: 2,
    //               width: "100%",
    //               height: "auto",
    //               borderRadius: "8px",
    //               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    //             }}
    //           >
    //             <CardMedia
    //               component="img"
    //               sx={{ width: 160, height: 120, borderRadius: "8px 0 0 8px" }}
    //               image={item.image}
    //               alt={item.name}
    //             />
    //             <CardContent>
    //               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
    //                 {item.name}
    //               </Typography>
    //               <Typography variant="body2" color="text.secondary">
    //                 {item.time}
    //               </Typography>
    //               <Typography variant="body2" color="text.secondary">
    //                 {item.address}
    //               </Typography>
    //             </CardContent>
    //           </Card>
    //         ))
    //       ) : (
    //         <Skeleton variant="rectangular" width="100%" height="100%" />
    //       )}
    //     </Box>
    //   </Box>
    // </div>

    <div className="featured-itineraries">
      <Typography
        variant="h3"
        sx={{ textAlign: "center", color: "#2f2f2f", fontWeight: 500, mb: 3 }}
      >
        Featured Itineraries
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#212529",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {/* Chat Box */}
        <Box
          sx={{
            bgcolor: "#212529",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "50%",
            padding: 2,
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          {/* Poppy's greeting */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 2,
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 1,
                padding: 1,
                backgroundColor: "#0083E0",
                borderRadius: "16px",
                maxWidth: "80%",
                alignSelf: "flex-start",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "500" }}
              >
                <TypeAnimation
                  sequence={[
                    "Hi, I'm Poppy, your AI assistant to help plan your day.",
                    3000, // Typing time
                  ]}
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </Typography>
            </Box>

            {/* User's message */}
            {showUserMessage && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                  padding: 2,
                  backgroundColor: "#B4B4B4",
                  borderRadius: "16px",
                  ml: 4,
                  maxWidth: "70%",
                  alignSelf: "flex-end",
                  textAlign: "right",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#000000", fontWeight: "500" }}
                >
                  <TypeAnimation
                    sequence={[
                      user,
                      5000, // Typing time
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false} // Remove cursor
                  />
                </Typography>
              </Box>
            )}

            {/* Poppy's final response */}
            {showPoppyResponse && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                  padding: 1,
                  backgroundColor: "#0277bd",
                  borderRadius: "16px",
                  maxWidth: "60%",
                  alignSelf: "flex-start",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#fff", fontWeight: "500" }}
                >
                  <TypeAnimation
                    sequence={[
                      poppy,
                      3000, // Typing time
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false} // Remove cursor
                  />
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Itinerary List */}
        <Box
          sx={{
            bgcolor: "#212529",
            flex: 1,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {showItinerary ? (
            itineraries[city]?.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  marginBottom: 2,
                  width: "100%",
                  height: "300px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 300, height: 300, borderRadius: "8px 0 0 8px" }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {item.time}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {item.address}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default FeaturedItineraries;
