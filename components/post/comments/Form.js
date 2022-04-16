import React, {useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {createComment} from "../../../lib/commentApi";
import Typography from "@mui/material/Typography";
import {Parallax} from "react-scroll-parallax";

export default function Form({_id}) {
    //TODO add form validation
    const [formData, setFormData] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const {register, handleSubmit, control, formState: {errors}} = useForm()
    const onSubmit = async data => {
        setIsSubmitting(true)
        setFormData(data)
        try {
            await createComment(data)
            setIsSubmitting(false)
            setHasSubmitted(true)
        } catch (err) {
            setFormData(err)
        }
    }

    const handleSubmittingClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSubmitting(false);
    };
    const handleSuccessSubmittedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setHasSubmitted(false);
    };

    return (
        <>
            <Snackbar open={hasSubmitted} autoHideDuration={6000} onClose={handleSuccessSubmittedClose}>
                <Alert severity="success" onClose={handleSuccessSubmittedClose}>
                    Thanks for your comment!
                </Alert>
            </Snackbar>
            <Snackbar open={isSubmitting} autoHideDuration={6000} onClose={handleSubmittingClose}>
                <Alert severity="info" onClose={handleSubmittingClose}>
                    Submitting comment…
                </Alert>
            </Snackbar>
            <Parallax translateY={['0', '+53']}>
                <Typography vairant="h1" component="h2" className="sectionHeader"
                            style={{color: "var(--brand-color", textAlign: "right"}}>
                    Leave a Comment
                </Typography>
            </Parallax>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <input {...register("_id")} type="hidden" name="_id" value={_id}/>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name={"name"}
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           name="name"
                                           label="Name"
                                           autoComplete="given-name"
                                           variant="filled"
                                           required
                                           fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name={"email"}
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           name="email"
                                           label="Email Address"
                                           autoComplete="given-name"
                                           variant="filled"
                                           required
                                           fullWidth
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name={"comment"}
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField onChange={onChange} value={value}
                                           name="comment"
                                           label="Comment"
                                           placeholder="What do you think?"
                                           variant="filled"
                                           required
                                           multiline
                                           rows={4}
                                           fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    COMMENT
                </Button>
            </Box>
        </>
    )
}