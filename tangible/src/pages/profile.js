import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import CustomizedAccordion from "../components/profileComponents/CustomizedAccordion";
// import Signin from "../components/ProfilePageComponents/Signin";
const userGuideIntroText =
  "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const Profile = () => {
  return (
    <Container maxWidth="lg">
      <Grid>
        <div>
          <CustomizedAccordion
            accordionTitle={"Account Information"}
            accordionColor={"#F5F5F5"}
            panel={"panel1"}
          ></CustomizedAccordion>
          <CustomizedAccordion
            accordionTitle={"Spectators"}
            accordionColor={"#F5F5F5"}
            panel={"panel2"}
          ></CustomizedAccordion>
          <CustomizedAccordion
            accordionTitle={"User Guide"}
            accordionColor={"#F5F5F5"}
            panel={"panel3"}
            bodyText={userGuideIntroText}
          >
            <CustomizedAccordion
              panel={"panel4"}
              accordionTitle={"Entries Screen Guide"}
              accordionColor={"#fff"}
            />
            <CustomizedAccordion accordionTitle={"Stats Screen Guide"} />
            <CustomizedAccordion accordionTitle={"Records Screen Guide"} />
            <CustomizedAccordion accordionTitle={"Profile Screen Guide"} />
          </CustomizedAccordion>
          <CustomizedAccordion
            panel={"panel5"}
            accordionTitle={"Customize Scale"}
            accordionColor={"#F5F5F5"}
          ></CustomizedAccordion>
        </div>
      </Grid>
    </Container>
  );
};

export default Profile;

{
  /* <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Accordion 1.1
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Second accordion</Typography>
              </AccordionDetails>
            </Accordion> */
}
