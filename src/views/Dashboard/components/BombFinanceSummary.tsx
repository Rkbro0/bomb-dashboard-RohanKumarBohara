import React, { useMemo } from 'react';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import { roundAndFormatNumber } from '../../../0x';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import BombImage from '../../../assets/img/bomb.png';
import BShareImage from '../../../assets/img/bshare-512.png';
import Bbond from '../../../assets/img/bbond-512.png';
import moment from 'moment';
import { Grid, Paper, Typography } from '@material-ui/core';

const BombFinanceSummary: React.FC<any> = ({ bombFinance, details }) => {
  //token details
  const { bomb, bshare, bbond } = details;
  //epoch and twap details
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const cashStat = useCashPriceInEstimatedTWAP();
  const livetwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const lastCashStat = useCashPriceInLastTWAP();
  const lasttwap = (Number(lastCashStat) / 100000000000000).toFixed(4);
  const tvl = useTotalValueLocked();
  return (
    <>
      <Grid xs={12} style={{ marginBottom: '42px', justifyContent: 'space-between' }}>
        <Paper style={{ background: 'rgba(30, 32, 60, 0.5)', height: '400px', borderRadius: '2px' }}>
          {/* start of BombFinanceSummary table */}
          <div style={{ textAlign: 'center', paddingTop: '2px' }}>
            <h3 style={{ color: 'white', paddingTop: '10px', textTransform: 'capitalize' }}>Bomb Finance Summary</h3>
            <hr style={{ border: '0.7px solid rgba(199, 195, 200, 0.8)', width: '95%' }} />
          </div>
          <Grid container spacing={1} style={{ textAlign: 'center', paddingTop: '15px' }}>
            <Grid item xs={5} style={{ textAlign: 'center', paddingLeft: '10px' }}>
              <Grid container style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                  <span>Current Supply</span>
                </Grid>
                <Grid item xs={2}>
                  <span>Total Supply</span>
                </Grid>
                <Grid item xs={3}>
                  <span>Price</span>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', marginLeft: '70px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="bomb"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={BombImage}
                  />
                  $ BOMB
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bomb.currentSupply / 1000000, 2)}M
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bomb.totalSupply / 1000, 2)}k
                </Grid>
                <Grid item xs={4}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bomb.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BOMB');
                      }}
                      alt="metamaskFox"
                      style={{ width: '30px', float: 'right', paddingTop: '10px', cursor: 'pointer' }}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bomb.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', marginLeft: '50px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="b share"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={BShareImage}
                  />
                  $ BSHARE
                </Grid>

                <Grid item xs={2}>
                  {roundAndFormatNumber(bshare.currentSupply / 1000, 2)}K
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bshare.totalSupply / 1000, 2)}m
                </Grid>
                <Grid item xs={4}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bshare.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BSHARE');
                      }}
                      alt="b share"
                      style={{ width: '30px', float: 'right', paddingTop: '10px', cursor: 'pointer' }}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bshare.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', marginLeft: '50px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="b bond"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={Bbond}
                  />
                  $ BBOND
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bbond.currentSupply / 1000, 2)}K
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bbond.totalSupply / 1000, 2)}k
                </Grid>
                <Grid item xs={4}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bbond.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BBOND');
                      }}
                      alt="metamask fox"
                      style={{ width: '30px', float: 'right', paddingTop: '10px', cursor: 'pointer' }}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bbond.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', marginLeft: '70px' }} />
            </Grid>
            <Grid item xs={3}></Grid>
            {/* epoch details */}
            <Grid item xs={4} style={{ textAlign: 'center' }}>
              <Typography style={{ color: '#fff' }}>Current Epoch</Typography>
              <Typography style={{ fontSize: '2rem' }}>{Number(currentEpoch)}</Typography>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', width: '30%' }} />
              <Typography style={{ fontSize: '2.5rem' }}>
                {' '}
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </Typography>
              <Typography style={{ color: '#fff', fontSize: '1.5rem' }}>Next Epoch in</Typography>

              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)', width: '30%' }} />

              <p>
                <span style={{ fontSize: '0.8rem' }}>Live TWAP :</span>{' '}
                <span style={{ color: ' #00E8A2' }}>{livetwap}</span>
              </p>
              <p>
                <span style={{ fontSize: '0.8rem' }}>TVL :</span>{' '}
                <span style={{ color: ' #00E8A2' }}>{'$' + roundAndFormatNumber(Number(tvl), 2)}</span>
              </p>
              <p>
                <span style={{ fontSize: '0.8rem' }}>Last Epoch TWAP :</span>
                <span style={{ color: ' #00E8A2' }}>{lasttwap}</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default BombFinanceSummary;
