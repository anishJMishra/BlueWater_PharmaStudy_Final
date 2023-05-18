import { Container } from "react-bootstrap";
import {
    Stepper,
    Step,
    useStepper,
    StepNumber,
    StepTitle,
    StepStatus,
    StepDescription,
} from "react-progress-stepper";
import React, {useState, useEffect} from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";



const StudyProgress= ({studyStatus}) => {
let trackStatus = -4;
if (studyStatus === 'completed') {
    trackStatus = 4;
}

if(studyStatus === 'accepted') {
    trackStatus = 3;
}

if (studyStatus === 'pending') {
    trackStatus = 2;
}

if (studyStatus === 'assigned') {
    trackStatus = 1;
}

    return (  
        
            <div>

                <Container className = "pbar">
                    <div> 
                        <h2>Study Progress</h2>

                        <Stepper step ={trackStatus}>
                            <Step>
                                <StepNumber />
                                <StepTitle> 
                                    <div className='invisible'>
                                        FDA Receives Information
                                    </div>
                                </StepTitle> 
                                <StepStatus /> 
                                <StepDescription>
                                    <div className = 'invisible'>
                                        Bavaria sends drugs to FDA
                                        Jane Hopkins sends eligible patients
                                    </div>
                                </StepDescription>
                            </Step>
                            <Step>
                                <StepNumber />
                                <StepTitle>
                                    <div className='invisible'>
                                        FDA Processing
                                    </div>
                                </StepTitle>
                                <StepStatus />
                                <StepDescription>
                                    <div className='invisible'>
                                    FDA relabels, assigns, and sends drugs to Jane Hopkins
                                    </div>
                                </StepDescription>
                            </Step>
                            <Step>
                                <StepNumber />
                                <StepTitle>
                                    <div className='invisible'>
                                        Administer Doses
                                    </div>
                                </StepTitle>
                                <StepStatus />
                                <StepDescription>
                                    <div className='invisible'>
                                    Doctor:
                                    Administer doses &
                                    Records visit notes
                                    </div>
                                </StepDescription>
                            </Step>
                            <Step>
                                <StepNumber />
                                <StepTitle>
                                    <div className = 'invisible'>
                                        Study Results Available
                                    </div>
                                </StepTitle>
                                <StepStatus />
                                <StepDescription> 
                                    <div className = 'invisible'>
                                        Study Results are released by FDA
                                    </div>
                                </StepDescription>
                            </Step>
        
                        </Stepper>
                    </div>
                </Container>
            </div> 
        
    ); 
};

export default StudyProgress;