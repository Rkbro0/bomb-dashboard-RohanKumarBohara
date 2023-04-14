import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import DepositImage from '../../../assets/img/arrow-down-circle.svg';
import WithdrawImage from '../../../assets/img/arrow-up-circle.svg';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useBank from '../../../hooks/useBank';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useEarnings from '../../../hooks/useEarnings';
import useRedeem from '../../../hooks/useRedeem';
import useHarvest from '../../../hooks/useHarvest';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import BShareImage from '../../../assets/img/bshare-512.png';
import BombBTCBImage from '../../../assets/img/bomb-bitcoin-LP.png';
import BShareBNBImage from '../../../assets/img/bshare-bnb-LP.png';
import { getDisplayBalance } from '../../../utils/formatBalance';
// Bombfarm stake details stored in const
const BombFarms: React.FC<any> = () => {
  const bombStats = useBombStats();
  const tShareStats = useShareStats();
  const bombBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bombBtcbstatsOnPool = useStatsForPool(bombBtcb);
  const bombBtcbstakedBalance = useStakedBalance(bombBtcb.contract, bombBtcb.poolId);
  const bombBtcbearnings = useEarnings(bombBtcb.contract, bombBtcb.earnTokenName, bombBtcb.poolId);
  const { onRedeem: onRedeemBombbtcb } = useRedeem(bombBtcb);
  const { onReward: onRewardBombbtcb } = useHarvest(bombBtcb);
  const [bombBtcbApproveStatus, bombBtcbApprove] = useApprove(bombBtcb.depositToken, bombBtcb.address);
  const bombBtcbStats = bombBtcb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bombBtcbPriceInDollars = useMemo(
    () => (bombBtcbStats ? Number(bombBtcbStats.priceInDollars).toFixed(2) : null),
    [bombBtcbStats],
  );
  const bombBtcbearnedInDollars = (
    Number(bombBtcbPriceInDollars) * Number(getDisplayBalance(bombBtcbearnings))
  ).toFixed(2);
  //bombfarm stats
  const bshareBnb = useBank('BshareBnbLPBShareRewardPool');
  const bshareBnbstatsOnPool = useStatsForPool(bshareBnb);
  const bshareBnbstakedBalance = useStakedBalance(bshareBnb.contract, bshareBnb.poolId);
  const bshareBnbearnings = useEarnings(bshareBnb.contract, bshareBnb.earnTokenName, bshareBnb.poolId);
  const { onRedeem: onRedeemBsharebnb } = useRedeem(bshareBnb);
  const { onReward: onRewardBsharebnb } = useHarvest(bshareBnb);
  const [bshareBnbApproveStatus, bsharebnbApprove] = useApprove(bshareBnb.depositToken, bshareBnb.address);
  const bshareBnbStats = bshareBnb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bSharebnbPriceInDollars = useMemo(
    () => (bshareBnbStats ? Number(bshareBnbStats.priceInDollars).toFixed(2) : null),
    [bshareBnbStats],
  );
  const bshareBnbearnedInDollars = (
    Number(bSharebnbPriceInDollars) * Number(getDisplayBalance(bshareBnbearnings))
  ).toFixed(2);

  const bombbtcb = {
    heading: 'BOMB-BTCB',
    bg: false,
    icon: bombBtcb.depositTokenName,
    tvl: bombBtcbstatsOnPool?.TVL,
    yourstake: getDisplayBalance(bombBtcbstakedBalance, bombBtcb.depositToken.decimal),
    yourstakeInDollars: bombBtcbearnedInDollars,
    approve: bombBtcbApproveStatus !== ApprovalState.NOT_APPROVED,
    returns: bombBtcbstatsOnPool?.dailyAPR,
    earned: getDisplayBalance(bombBtcbearnings),
    deposit: bombBtcbApprove,
    withdraw: onRedeemBombbtcb,
    claimrewards: onRewardBombbtcb,
  };
  const bsharebnb = {
    heading: 'BSHARE-BNB',
    bg: false,
    icon: bshareBnb.depositTokenName,
    tvl: bshareBnbstatsOnPool?.TVL,
    yourstakeInDollars: bshareBnbearnedInDollars,
    yourstake: getDisplayBalance(bshareBnbstakedBalance, bshareBnb.depositToken.decimal),
    returns: bshareBnbstatsOnPool?.dailyAPR,
    approve: bshareBnbApproveStatus !== ApprovalState.NOT_APPROVED,
    earned: getDisplayBalance(bshareBnbearnings),
    deposit: bsharebnbApprove,
    withdraw: onRedeemBsharebnb,
    claimrewards: onRewardBsharebnb,
  };

  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();
  const StyledButton = styled.button`
    background: transparent;
    cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
    &:hover {
      background-color: ${(p) => (p.disabled ? 'transparent' : '#FFFFFF')};
      color: ${(p) => (p.disabled ? '#FFFFFF80' : 'black')};
    }
    border: 4px solid currentColor;
    color: ${(p) => (p.disabled ? '#FFFFFE80' : '#FFFFFE')};
    border-radius: 21px;
    margin-right: 11px;
    padding: 7px;
    margin: 0 auto;
  `;
  return (
    <>
      <Grid xs={12} style={{ marginBottom: '42px' }}>
        {/* BOMBFARM TAB */}
        <Paper
          style={{
            background: 'rgba(30, 32, 60, 0.5)',
            height: '500px',
            borderRadius: 5,
            borderColor: '#728CDF',
            padding: 5,
          }}
          variant="outlined"
        >
          {/* claim all button  */}
          <Box style={{ textAlign: 'left', padding: '10px 20px 0px 20px' }}>
            <h3 style={{ color: 'white', textTransform: 'capitalize', paddingTop: '10px' }}>
              Bomb Farms
              <span style={{ float: 'right' }}>
                <Button
                  style={{
                    border: 'solid 2px',
                    borderRadius: '20px',
                  }}
                >
                  Claim All
                  <img alt="b share" style={{ width: '20px', marginLeft: '15px' }} src={BShareImage} />
                </Button>
              </span>
            </h3>
            <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
          </Box>
          <Box p={4} style={{ textAlign: 'left', paddingTop: '10px' }}>
            <img alt="bomb btc" style={{ width: '60px', float: 'left', marginRight: '10px' }} src={BombBTCBImage} />
            <h3 style={{ color: 'white', marginTop: '20px' }}>
              BOMB-BTCB
              <span
                style={{
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '3px',
                  borderRadius: '3px',
                  marginLeft: '20px',
                  verticalAlign: 'center',
                  textTransform: 'capitalize',
                  backgroundColor: 'rgba(0, 234, 160, 0.5)',
                }}
              >
                Recommended
              </span>
              <span style={{ float: 'right' }}>
                TVL : <strong>${bombbtcb.tvl}</strong>
              </span>
            </h3>
            <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)' }} />
          </Box>
          <Grid container spacing={4} style={{ textAlign: 'center' }}>
            <Grid item xs={2} style={{ padding: '0' }}>
              Daily returns:
              <h1 style={{ color: 'white', marginTop: '20px', fontSize: '2rem' }}>{bombbtcb.returns}%</h1>
            </Grid>
            <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
              Your Stake:
              <p>
                <img alt="b share" style={{ width: '20px' }} src={BombBTCBImage} />
                {bombbtcb.yourstake}
              </p>
              <p>≈ ${bombbtcb.yourstakeInDollars}</p>
            </Grid>
            <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
              Earned:
              <p>
                <img alt="bomb" style={{ width: '20px' }} src={BShareImage} />
                {bombbtcb.earned}
              </p>
              <p>≈ ${bombbtcb.earned}</p>
            </Grid>
            {/* deposit button  */}
            <Grid item xs={6} style={{ padding: '0' }}>
              <Box style={{ textAlign: 'center', marginTop: '60px' }}>
                <StyledButton
                  disabled={bombbtcb.approve}
                  onClick={() => {
                    bombbtcb.deposit();
                  }}
                  style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Deposit</div>
                    <div>
                      <img alt="deposit icon" style={{ width: '20px' }} src={DepositImage} />
                    </div>
                  </div>
                </StyledButton>
                {/* withdraw button */}
                <StyledButton
                  disabled={Number(bombbtcb.yourstake) === 0 || (!canWithdraw && !canClaimReward)}
                  onClick={() => {
                    bombbtcb.withdraw();
                  }}
                  style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Withdraw</div>
                    <div>
                      <img alt="Withdraw icon" style={{ width: '20px' }} src={WithdrawImage} />
                    </div>
                  </div>
                </StyledButton>
                {/* claim reward button  */}
                <StyledButton
                  onClick={() => {
                    bombbtcb.claimrewards();
                  }}
                  disabled={Number(bombbtcb.earned) === 0 || !canClaimReward}
                  style={{
                    width: '30%',
                    border: 'solid 2px',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Claim Rewards</div>
                    <div>
                      <img alt="b share" style={{ width: '20px', marginLeft: '5px' }} src={BShareImage} />
                    </div>
                  </div>
                </StyledButton>
              </Box>
            </Grid>
          </Grid>

          <Box p={4} style={{ textAlign: 'left' }}>
            <img alt="b share bnb" style={{ width: '60px', float: 'left', marginRight: '10px' }} src={BShareBNBImage} />
            <h3 style={{ color: 'white', marginTop: '20px' }}>
              BSHARE-BNB
              <span
                style={{
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '3px',
                  borderRadius: '3px',
                  marginLeft: '20px',
                  verticalAlign: 'center',
                  textTransform: 'capitalize',
                  backgroundColor: 'rgba(0, 240, 160, 0.5)',
                }}
              >
                Recommended
              </span>
              <span style={{ float: 'right' }}>
                TVL : <strong>${bsharebnb.tvl}</strong>
              </span>
            </h3>

            <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)' }} />
          </Box>
          <Grid container spacing={4} style={{ textAlign: 'center' }}>
            <Grid item xs={2} style={{ padding: '0' }}>
              Daily returns:
              <h1 style={{ color: 'white', marginTop: '20px', fontSize: '2rem' }}>{bsharebnb.returns}%</h1>
            </Grid>
            <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
              Your Stake:
              <p>
                <img alt="b share" style={{ width: '20px' }} src={BShareBNBImage} />
                {bsharebnb.yourstake}
              </p>
              <p>≈ ${bsharebnb.yourstakeInDollars}</p>
            </Grid>
            <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
              Earned:
              <p>
                <img alt="bomb" style={{ width: '20px' }} src={BShareImage} />
                {bsharebnb.earned}
              </p>
              <p>≈ ${bsharebnb.earned}</p>
            </Grid>
            <Grid item xs={6} style={{ padding: '0' }}>
              <Box style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '30px' }}>
                <StyledButton
                  disabled={bsharebnb.approve}
                  onClick={() => {
                    bsharebnb.deposit();
                  }}
                  style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Deposit</div>
                    <div>
                      <img alt="deposit icon" style={{ width: '20px' }} src={DepositImage} />
                    </div>
                  </div>
                </StyledButton>
                {/* withdraw button  */}
                <StyledButton
                  disabled={Number(bsharebnb.yourstake) === 0 || (!canWithdraw && !canClaimReward)}
                  onClick={() => {
                    bsharebnb.withdraw();
                  }}
                  style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Withdraw</div>
                    <div>
                      <img alt="Withdraw icon" style={{ width: '20px' }} src={WithdrawImage} />
                    </div>
                  </div>
                </StyledButton>
                {/* claim reward button  */}
                <StyledButton
                  disabled={Number(bsharebnb.earned) === 0 || !canClaimReward}
                  onClick={() => {
                    bsharebnb.claimrewards();
                  }}
                  style={{
                    width: '30%',
                    border: 'solid 2px',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <div>Claim Rewards</div>
                    <div>
                      <img alt="b share" style={{ width: '20px', marginLeft: '5px' }} src={BShareImage} />
                    </div>
                  </div>
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default BombFarms;
