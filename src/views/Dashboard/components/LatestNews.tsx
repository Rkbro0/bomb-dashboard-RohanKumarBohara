import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';

const LatestNews: React.FC<any> = () => {
  return (
    <>
      <Grid item xs={12} sm={3} style={{ marginBottom: '20px' }}>
        <Paper
          style={{
            background: 'rgba(30, 32, 60, 0.5)',
            height: '455px',
            borderRadius: 5,
            borderColor: '#728CDF',
            padding: 5,
          }}
          variant="outlined"
        >
          <Box p={4} style={{ textAlign: 'left' }}>
            {/* latest news items can be imported here and used using auto scroll */}
            <h3 style={{ color: 'white', textTransform: 'capitalize' }}>Latest News</h3>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};
export default LatestNews;
