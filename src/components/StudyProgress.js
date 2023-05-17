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

 const StudyProgress = () => {
        const { step, incrementStep, decrementStep } = useStepper(0, 4);
        return (
                <div>
                   
                    <Container className = "pbar">
                        <div>
                            <h2>Study Progress</h2>
    
                            <Stepper step ={0}>
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