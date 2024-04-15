import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardHeader } from '@mui/material';
import { Divider } from '@mui/material';
function MainFeaturedPost(props) {
    const { post } = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.900',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
                backgroundImage: `url(${post.background})`,
            }}
            elevation={4}
            square={false}
        >

            {<img sx={{ width: 100, height: 450 }} style={{ display: 'none' }} src={post.background} alt={post.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }}
            />
            <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                backgroundColor='rgba(0,0,0,.7)'
                sx={{ height: 450 }}
            >
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography variant="h4" color="inherit" gutterBottom>
                            {post.title} {post.release_year}
                        </Typography>
                        <Typography variant="body2" color="inherit" gutterBottom>
                            {post.release_date}
                        </Typography>
                        <Typography color="inherit" paragraph>
                            {post.overview}
                        </Typography>


                        <Typography color="subtitle1" >
                            <Grid container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                            {post.genres && post.genres.map((genre, index) => (
                                <>
                                        {genre.name}
                                        {index == post.genres.length - 1 ?
                                            <></>
                                            :
                                            <> • </>
                                        }
                                    </>
                                ))}
                            </Grid>
                        </Typography>

                    </Box>
                </Grid>
                <Grid item >
                    <Card >
                        <CardMedia
                            component="img"
                            alt={post.title}
                            image={post.cover}
                            sx={{ width: 300, height: 425 }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default MainFeaturedPost;