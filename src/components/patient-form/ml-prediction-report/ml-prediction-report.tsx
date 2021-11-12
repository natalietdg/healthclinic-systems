import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, TextArea, AlertBox, Table } from 'Components/shared';
import { BMIStatus } from 'Data/patientInformationValues';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MLPredictionReportProps {
    data: any;
    patient?: boolean;
    onSubmit?: (data: any ) => void;
}
//    `rgba(93,0,251,1)`,
            //                     `rgba(0,146,251,1)`,
            //                     `rgba(204,2,217,1)`,
            //                     `rgba(200,213,8,1)`,
const MLPredictionReport:React.FC<MLPredictionReportProps> = ({data, patient=true, onSubmit}) => {
    const { t } = useTranslation();
    const [ obesityPredictionReport, setObesityPredictionReport ] = useState<any>({});
    const [ predictionValues, setPredictionValues ] = useState<any>([]);
    const [ weightStatus, setWeightStatus ] = useState<any>('');
    const [ tempFeedback, setTempFeedback ] = useState<any>('');
    const [ error, setError ] = useState<any>({});

    const accessToken = localStorage.getItem('accessToken') || undefined
  
    useEffect(() => {
        setObesityPredictionReport(data);
        setWeightStatus(BMIStatus(data?.inputData?.healthAndFamilyHistory?.BMI));
        if(data?.fullResponse?.probability) {
            const predictionData = Object.keys(data?.fullResponse?.probability).map((key)=> {
                let tempData = {
                    name: t(`label.${key.toLowerCase()}`),
                    "Probability (%)": data?.fullResponse?.probability[key],
                    amt: data?.fullResponse?.probability[key],
                }
                return tempData;
            })
            setPredictionValues(predictionData);
        }

    },[data]);

    const handleTextChange = (name: any, value: any) => {
        setTempFeedback(value);
    }



    return(
        <div>
            {patient==false?<h2>
                {
                    new Date(obesityPredictionReport?.created).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }
            </h2>: <h3 className="title"> {
                    new Date(obesityPredictionReport?.created).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }</h3>}
            
            {patient==false? <h3 className="title">Feedback</h3>
            :  <h4 className="span--title">Feedback</h4>}
            <span className="span">
                    {
                       
                    obesityPredictionReport?.feedback == '' && (patient==false) ?
                    <Row style={{justifyContent: 'flex-start'}}>
                        <div>
                            <h4 className="title">Please add feedback.</h4>
                            <TextArea error={!!error?.feedback} label="" name="feedback" value={tempFeedback} onChange={handleTextChange}/>
                            <AlertBox name="feedback" error={error?.feedback}/>
                            <button className="button" onClick={() => {onSubmit?onSubmit(tempFeedback):() => {}}}><img className="img" src="/assets/images/add-grey.png"/>Add Feedback</button> 
                        </div>
                    </Row>
                    :<h4 className='span--text'>
                        {obesityPredictionReport?.feedback}
                    </h4>  
                }
                
                {/* {
                obesityPredictionReport?.feedback && patient &&
                    <h4 className='span--text'>
                        {obesityPredictionReport?.feedback}
                    </h4>  
                }
                 */}
                                  
            </span>
            
            {patient==false? <h3 className="title">Prediction</h3>
            :  <h4 className="span--title">Prediction</h4>}
            <div style={{padding: '30px', display: 'flex', justifyContent: 'center'}}>
                <Table 
                    columns={[
                        {colName: 'Hypertension'}, 
                        {colName:'Diabetes'}, 
                        {colName:'High Cholesterol'}, 
                        {colName: 'Heart Disease'}
                    ]}
                    filteredData={[
                        {
                            'Hypertension': predictionValues[0]?.amt.toString() + '%',
                            'Diabetes': predictionValues[1]?.amt.toString() + '%',
                            'High Cholesterol': predictionValues[2]?.amt.toString() + '%',
                            'Heart Disease': predictionValues[3]?.amt.toString() + '%'
                        },
                    ]}
                    visibility='Today'
                
                />
            </div>
            
            {/* {
                <Row style={{justifyContent: 'flex-start'}}>
                    {
                        obesityPredictionReport?.fullResponse?.probability  && Object.keys(obesityPredictionReport?.fullResponse?.probability).map((name: any) => {
                        return (
                            <span className="span">
                                <h4 className="span--title">{t(`label.${name.toLowerCase()}`)}</h4>
                                <h4 className='span--text'>{obesityPredictionReport?.fullResponse?.probability[name]}%</h4>
                            </span>)
                    })}
                </Row>
            } */}
          
            <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
                <h3 style={{textAlign: 'center', padding: '20px'}}>Obesity-related Diseases Prediction</h3>
                <BarChart 
                    width={1000}
                    height={300}
                    data={predictionValues}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}>
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Probability (%)" fill='#5d00fb' />
                </BarChart>
            </div>
            { obesityPredictionReport?.inputData &&
           <>
            <div>
                <h2>Family History & BMI</h2>
                <Row>
                    <div>
                        <span className="span">
                            <h4 className="span--title">BMI</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.healthAndFamilyHistory?.BMI}</h4>                     
                        </span>
                    </div>
                    <div className="scale">
                        <h4 className={weightStatus}>{t(`label.${weightStatus}`)}</h4>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">Family History</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.healthAndFamilyHistory?.familyHistory}</h4>                     
                        </span>
                    </div>
                </Row>
            </div>
            <div>
                <h2>Dietary Intake</h2>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.avgAlcoholConsumption')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.alcoholFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.bbqIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.bbqIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.cruciferousVegetablesFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.cruciferousVegetablesFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.dairyFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.dairyFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.dessertFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.dessertFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.eggFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.eggFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.fiveFruitFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.fiveFruitFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.fourCitrusFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.fourCitrusFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.friedFoodFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.friedFoodFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.fruitsIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.fruitsIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.grainBeansIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.grainBeansIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.lessFiveOrangeYellowFruitVegeFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.lessFiveOrangeYellowFruitVegeFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.lessThanThreeTimesNLMGMRCAYWeeklyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.lessThanThreeTimesNLMGMRCAYWeeklyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.lessThanTwoDairyServingsDailyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.lessThanTwoDairyServingsDailyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.meatFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.meatFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.meatOverFriedFood')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.meatOverFriedFood}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.milkTeaCoffeeLowfat')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.milkTeaCoffeeLowfat}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.moreThreeCoffeeFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.moreThreeCoffeeFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.nitrateSaltMeatFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.nitrateSaltMeatFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.processedFoodIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.processedFoodIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.smokedMeatFishFrequencyIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.smokedMeatFishFrequencyIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.snacksFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.snacksFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.sodaCandyFrequency')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.sodaCandyFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.vegetableIntake')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.vegetableIntake}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.vegetarian')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.dietaryIntake?.vegetarian}</h4>                    
                        </span>
                    </div>
                </Row>
            </div>
            <div>
                <h2>Lifestyle Information</h2>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.activeScale')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.activeScale}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.computerHours')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.computerHours}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.dietaryPlan')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.dietaryPlan}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.durationOfSleep')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.durationOfSleep}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.ergonomicWorkspace')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.ergonomicWorkspace}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.exerciseProgramme')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.exerciseProgramme}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.occupation')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.occupation}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.personalTrainer')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.personalTrainer}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.seatedHours')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.seatedHours}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.numberOfCigarettesPerDay')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.smokingFrequency}</h4>                    
                        </span>
                    </div>
                </Row>
                <Row style={{justifyContent: 'flex-start'}}>
                    <div>
                        <span className="span">
                            <h4 className="span--title">{t('question.stress')}</h4>
                            <h4 className='span--text'>{obesityPredictionReport?.inputData?.lifestyleInformation?.stress}</h4>                    
                        </span>
                    </div>
                </Row>
            </div> 
            </>}
        </div>

    )
}

export default MLPredictionReport;