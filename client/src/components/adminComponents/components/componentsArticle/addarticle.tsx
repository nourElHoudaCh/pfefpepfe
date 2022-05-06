import React,{useState,FC } from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TextField,} from "@material-ui/core";
import './comp1.css';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
const useStyles = makeStyles(() => ({
  input1: {
    height: 5 ,
    fontSize: "15px",
    background:"white",
  
   },
  
}));
interface IFormInputs {
 code: number;
  nom: string;
prix: number;
 
}
/* .test(
  "maxDigits",
  "au minimum deux nombres",
  (number) => String(number).length >1 
).*/
const schema = yup.object().shape({

 code: yup.number().required('Veuillez entrer le code de l"article').test(
  "maxDigits",
  "au minimum six nombres",
  (number) => String(number).length >5
), 
 
  nom: yup.string().min(4).max(20).required('Veuillez entrer le nom  de l"article').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un nom valide'),
 prix: yup.number().required('Veuillez entrer le prix')
 
});
 
  const Addarticle: FC = () => {
    const {
      register,
      control,
      handleSubmit,
      watch,
      formState: { errors ,isSubmitSuccessful},
      reset,  resetField, setValue
    
    } = useForm<IFormInputs>({
      resolver: yupResolver(schema),
     
     });
   
  const classes = useStyles();
  const [CodeArticle, setCodeArticle]=useState('');
  const [Designation,setDesignation]=useState('')
  const [Prix,setPrix]=useState("")
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [valide,setvalide]=useState(false);
  const [formsubmit,setfprmsubmit]=useState(true);

 

 
 
 
 
  const submit :SubmitHandler<IFormInputs> =  (data)=>{
    console.log(data)
    console.log(data.code)
    console.log(data.nom)
    console.log(data.prix);
var prixarticle=(data.prix);
var codearticle=(data.code);
var nomarticle=(data.nom);

    axios.post("http://localhost:5000/article/ajouter",{codearticle,nomarticle,prixarticle})
    .then(res => {
        if(res.status===200){
          reset({ prix:'',nom:'',code:''}) 
         
          setSubmitted(true)
          const timer = setTimeout(() => {
            setSubmitted(null)
          }, 3000);
        }
        else{
          setError(true)
          const timer = setTimeout(() => {
            setError(false)
          }, 3000);
          setSubmitted(false);
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
      setSubmitted(null);
 })}
 const inputChangeHandler = e => {
  const value = e.target.value
  setCodeArticle(e.target.value)
  console.log(CodeArticle)
  
}

  return (
  
    <div className='body'>
  
             <h3>Ajouter un article</h3>

     {Submitted? <Alert className='success-pop' severity="success">
              <AlertTitle>Succès</AlertTitle>
                Article bien ajouter
              </Alert>:null}
            {error? <Alert  className='warning-pop' severity="warning">
        <AlertTitle>Alerte</AlertTitle>
        Un article existe déja avec le code article saisie — <strong>Veuillez consulter la liste des articles!</strong>
      </Alert>:null}
      <>
    <form className='formaddarticle' onSubmit={handleSubmit(submit)} >
<div className='iputarticle'>
<Controller
            name="code"
            control={control}
           
            render={({ field }) => (
              <TextField       fullWidth
              margin="normal"
              variant="filled"
                id="codearticle"
              label="codede l'article"
              InputProps={{ classes: { input: classes.input1 } }}
              placeholder="entrer le code de l'article"
              
              defaultValue=""
              {...field}
                error={!!errors.code}
                helperText={errors.code? errors.code?.message : ''}
               
              />
            )}
          />
          <Controller
            name="nom"
            control={control}
           
            render={({ field }) => (
              <TextField     id="codearticle"
              fullWidth
              margin="normal"
              variant="filled"
              defaultValue=""
              label="nom de l'article"
              InputProps={{ classes: { input: classes.input1 } }}
              placeholder="entrer le nom de l'article"
             
                {...field}
                
    
                error={!!errors.nom}
                helperText={errors.nom ? errors.nom?.message : ''}
               
              />
            )}
          />
          <Controller
            name="prix"
            control={control}
           
            render={({ field }) => (
              <TextField    id="prixarticle"
              label="prix de l'article"
              variant="filled"
              placeholder="entrer le prix de l'article"
              fullWidth
              margin="normal"
              InputProps={{ classes: { input: classes.input1 } }}
              defaultValue=""
           
                {...field}
                
    
                error={!!errors.prix}
                helperText={errors.prix ? errors.prix?.message : ''}
               
              />
            )}
          />
       
         </div>
          <div className='butart'>
            <div className='bt'>
              <br></br>
<Button       type='submit' variant="contained" endIcon={<SendIcon />}> Envoyer </Button></div>
<div className='bt'>
 <Button   type='reset'     onClick={() => { reset({ prix: null,nom:'',code:null})  } }variant="outlined" startIcon={<DeleteIcon />}> Annuler </Button>  </div>
 </div>
</form>


    </>
    <p>{error}</p>
      <p>{Submitted}</p>
  </div>
   
  );
}
export default  Addarticle;