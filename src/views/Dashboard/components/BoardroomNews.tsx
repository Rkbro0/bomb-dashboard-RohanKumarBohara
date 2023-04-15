import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombFinance from '../../../hooks/useBombFinance';
import styled from 'styled-components';
import DepositImage from '../../../assets/img/arrow-down-circle.svg';
import WithdrawImage from '../../../assets/img/arrow-up-circle.svg';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useApprove, { ApprovalState } from '../../../hooks/useApprove'; //, {ApprovalState}
import useBombStats from '../../../hooks/useBombStats';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import { roundAndFormatNumber } from '../../../0x';
import DiscordIcon from '../../../assets/img/discord.svg';
import DocIcon from '../../../assets/img/document.svg';
import BombImage from '../../../assets/img/bomb.png';
import BShareImage from '../../../assets/img/bshare-512.png';
import NewsTicker from './NewsTicker';

const BoardroomNews: React.FC<any> = () => {
  // Stake share details stored in const
  const bombStats = useBombStats();
  const bombFinance = useBombFinance();
  const [boardroomTVL, setBoardroomTVL] = useState(0);
  useEffect(() => {
    const TVLcalc = async () => {
      const BSharePrice = (await bombFinance.getShareStat()).priceInDollars;
      const BoardroomShareBalance = await bombFinance.BSHARE.balanceOf(bombFinance.currentBoardroom().address);
      setBoardroomTVL(
        Number(getDisplayBalance(BoardroomShareBalance, bombFinance.BSHARE.decimal)) * Number(BSharePrice),
      );
    };
    TVLcalc();
  }, [bombFinance]);

  const stakedBalance = useStakedBalanceOnBoardroom();
  const totalStaked = useTotalStakedOnBoardroom();
  const earning = useEarningsOnBoardroom();
  const { onRedeem } = useRedeemOnBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earning))).toFixed(2);
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
  //All values of Token stored
  const values = {
    // boardroom values, daily return, your stake, earned
    approve: approveStatus !== ApprovalState.NOT_APPROVED,
    tvl: roundAndFormatNumber(boardroomTVL, 2),
    totalstaked: getDisplayBalance(totalStaked),
    yourstakeInDollars: earnedInDollars,
    yourstake: getDisplayBalance(stakedBalance),
    dailyReturn: roundAndFormatNumber(useFetchBoardroomAPR() / 365, 2),
    earned: getDisplayBalance(earning),
    deposit: approve,
    withdraw: onRedeem,
    claimrewards: onReward,
  };

  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();
  return (
    <>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={8} style={{ marginBottom: '20px' }}>
          <Box p={2} style={{ textAlign: 'center' }}>
            <a
              href="https://docs.bomb.money/"
              style={{ float: 'right', color: '#9EE6FF', textDecoration: 'underline', marginBottom: '10px' }}
            >
              Read Investement Strategy &gt;
            </a>
            {/* Read Investement Strategy button */}
            <Button
              href="./invest"
              style={{
                color: 'white',
                background: 'rgba(7, 6, 5, 255)',
                width: '100%',
                marginBottom: '17px',
                border: '2px solid',
              }}
            >
              Invest Now
            </Button>
            {/* discord button */}
            <Button
              href="https://discord.bomb.money"
              style={{
                color: 'black',
                background: 'rgba(233, 241, 251, 255)',
                width: '45%',
                border: '1px solid',
                marginRight: '25px',
              }}
            >
              <img alt="discord icon" style={{ width: '20px', marginRight: '5px' }} src={DiscordIcon} />
              Chat on Discord
            </Button>
            {/* Docs button */}
            <Button
              href="https://docs.bomb.money/"
              style={{
                color: 'black',
                background: 'rgba(233, 241, 251, 255)',
                width: '45%',
                border: '1px solid',
                marginLeft: '25px',
              }}
            >
              <img alt="doc icon" style={{ width: '20px', marginRight: '5px' }} src={DocIcon} />
              Read Docs
            </Button>
          </Box>
          <Paper
            style={{
              background: 'rgba(30, 32, 60, 0.5)',
              height: '300px',
              borderRadius: 5,
              borderColor: '#728CDF',
              padding: 5,
            }}
            variant="outlined"
          >
            <Box p={4} style={{ textAlign: 'left' }}>
              {/* Boardroom section */}
              <img alt="bSHARE" style={{ width: '50px', float: 'left', marginRight: '10px' }} src={BShareImage} />
              <h3 style={{ color: 'white', textTransform: 'capitalize' }}>
                BoardRoom
                <span
                  style={{
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '3px',
                    borderRadius: '3px',
                    marginLeft: '20px',
                    verticalAlign: 'center',
                    textTransform: 'capitalize',
                    backgroundColor: 'rgba(0, 232, 162, 0.5)',
                  }}
                >
                  Recommended
                </span>
              </h3>
              <p>
                Stake BSHARE and earn BOMB every epoch
                <span style={{ float: 'right' }}>
                  TVL: <strong>$ {values.tvl}</strong>
                </span>
              </p>
              <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)' }} />
              <p style={{ float: 'right' }}>
                Total Staked:
                <img alt="BShare" style={{ width: '13px', margin: '0 5px' }} src={BShareImage} />
                <strong>{values.totalstaked}</strong>
              </p>
            </Box>
            {/* Boardroom data */}
            <Grid container spacing={4} style={{ textAlign: 'center' }}>
              <Grid item xs={3} style={{ padding: '0' }}>
                Daily Returns:
                <Typography style={{ fontSize: '2rem' }}>{values.dailyReturn}%</Typography>{' '}
              </Grid>
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Your Stake:
                <p>
                  <img alt="BShare" style={{ width: '20px' }} src={BShareImage} />
                  {values.yourstake}
                </p>
                <p>≈ ${values.yourstakeInDollars}</p>
              </Grid>
              {/* Amount earned data in usd */}
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Earned:
                <p>
                  <img alt="bomb" style={{ width: '20px' }} src={BombImage} />
                  {values.earned}
                </p>
                <p>≈ $ {values.earned}</p>
              </Grid>
              <Grid item xs={5} style={{ padding: '0' }}>
                <Box style={{ textAlign: 'center', padding: '10px' }}>
                  <StyledButton
                    disabled={values.approve}
                    onClick={() => {
                      values.deposit();
                    }}
                    style={{ width: '45%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
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
                        <img alt="Deposit Icon" style={{ width: '20px' }} src={DepositImage} />
                      </div>
                    </div>
                  </StyledButton>

                  <StyledButton
                    // only works when user can withdraw and claim reward
                    disabled={Number(values.yourstake) === 0 || (!canWithdraw && !canClaimReward)}
                    onClick={() => {
                      values.withdraw();
                    }}
                    style={{ width: '45%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
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

                  <StyledButton
                    onClick={() => {
                      values.claimrewards();
                    }}
                    // only works if canClaim Reward hook returns true
                    disabled={Number(values.earned) === 0 || !canClaimReward}
                    style={{
                      width: '90%',
                      border: 'solid 2px',
                      borderRadius: '20px',
                      marginTop: '10px',
                      marginRight: '10px',
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
                        <img alt="BShare" style={{ width: '20px' }} src={BShareImage} />
                      </div>
                    </div>
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Latest News grid item*/}
        <Grid item xs={12} sm={4} style={{ marginBottom: '20px' }}>
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
              <h3 style={{ color: 'white', textTransform: 'capitalize', marginBottom:'40px' }}>Latest News</h3>
              <h3> </h3>
              <NewsTicker />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};


export default BoardroomNews;
