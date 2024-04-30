import {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box } from '@mui/material';
import NewsletterElement from '../LandingPage/NewsletterElement';

interface TextMobileStepperProps {
    clubId: number;
    clubName: string;
    clubImage: string;
    clubPosts : any[];
}

const TextMobileStepper = (props: TextMobileStepperProps )  => {
    const {clubId, clubName, clubImage, clubPosts} = props;

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = clubPosts.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    // const handleStepChange = (step: number) => {
    //   setActiveStep(step);
    // };
  
    return (
        <Box sx={{m: 1}}>
            <NewsletterElement clubName={clubName} clubId={clubId} clubImage={clubImage} postId={clubPosts[activeStep].id} title={clubPosts[activeStep].title} timePosted={clubPosts[activeStep].time_posted} author={clubPosts[activeStep].author} summary={clubPosts[activeStep].summary} />
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
        {/* <hr/> */}
      </Box>
    );
  }
  
  export default TextMobileStepper;