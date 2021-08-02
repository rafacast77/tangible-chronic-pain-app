import React from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import CustomizedAccordion from "../components/profileComponents/CustomizedAccordion";
import UserGuideFormat from "../components/profileComponents/UserGuideFormat";
import { userGuide } from "../components/profileComponents/TextUserGuide";

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
            bodyText={userGuide.userGuideDesc}
          >
            <CustomizedAccordion
              panel={"panelUser1"}
              accordionTitle={"Entries Screen Guide"}
              accordionColor={"#fff"}
            >
              <UserGuideFormat userGuideText={userGuide.entries} />
            </CustomizedAccordion>

            <CustomizedAccordion
              accordionTitle={"Stats Screen Guide"}
              panel={"panelUser2"}
            >
              <UserGuideFormat userGuideText={userGuide.stats} />
            </CustomizedAccordion>
            <CustomizedAccordion
              accordionTitle={"Records Screen Guide"}
              panel={"panelUser3"}
            >
              <UserGuideFormat userGuideText={userGuide.records} />
            </CustomizedAccordion>
            <CustomizedAccordion
              accordionTitle={"Profile Screen Guide"}
              panel={"panelUser4"}
            >
              <UserGuideFormat userGuideText={userGuide.profile} />
            </CustomizedAccordion>
          </CustomizedAccordion>
          <CustomizedAccordion
            panel={"panel4"}
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
