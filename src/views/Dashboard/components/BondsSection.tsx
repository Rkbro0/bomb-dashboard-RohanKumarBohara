import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import ExchangeModal from '../../Bond/components/ExchangeModal';
import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useModal from '../../../hooks/useModal';
import WithdrawImage from '../../../assets/img/arrow-up-circle.svg';
import CartImage from '../../../assets/img/ShoppingCart.svg';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import Bbond from '../../../assets/img/bbond-512.png';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';

const Bonds: React.FC<any> = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const bondsPurchasable = useBondsPurchasable();
  const addTransaction = useTransactionAdder();
  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );
  const StyledButton = styled.button`
    background: transparent;
    cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
    &:hover {
      background-color: ${(p) => (p.disabled ? 'transparent' : '#FFFFFF')};
      color: ${(p) => (p.disabled ? '#FFFFFF80' : 'black')};
    }
    color: ${(p) => (p.disabled ? '#FFFFFE80' : '#FFFFFE')};
    border: 4px solid currentColor;
    color: ${(p) => (p.disabled ? '#FFFFFE80' : '#FFFFFE')};
    border-radius: 21px;
    margin-right: 11px;
    padding: 7px;
    margin: 0 auto;
  `;
  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );

  const balanceBomb = useTokenBalance(bombFinance.BOMB);
  const [onPresentP, onDismissP] = useModal(
    <ExchangeModal
      title={'Purchase'}
      description={
        !isBondPurchasable
          ? 'BOMB is over peg'
          : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
      }
      max={balanceBomb}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismissP();
      }}
      action={'Purchase'}
      tokenName={'BOMB'}
    />,
  );

  const balanceBbond = useTokenBalance(bombFinance.BBOND);
  const [onPresentR, onDismissR] = useModal(
    <ExchangeModal
      title={'Redeem'}
      description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
      max={balanceBbond}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        onDismissR();
      }}
      action={'Redeem'}
      tokenName={'BBOND'}
    />,
  );
  return (
    <>
      <Grid xs={12}>
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
            <img alt="b bond" style={{ width: '60px', float: 'left', marginRight: '10px' }} src={Bbond} />
            <h3 style={{ color: 'white' }}>Bonds</h3>
            <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
          </Box>
          <Grid container spacing={3} style={{ textAlign: 'center' }}>
            <Grid item xs={3} style={{ padding: '0' }}>
              Current Price :(Bomb)^2
              <h3 style={{ color: 'white', marginTop: '10px' }}>
                BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
              </h3>
            </Grid>
            <Grid item xs={3} style={{ padding: '0', textAlign: 'center' }}>
              Available to redeem:
              <h3 style={{ color: 'white', fontSize: '2rem' }}>
                <img alt="b bond" style={{ width: '40px' }} src={Bbond} />
                {getDisplayBalance(bondBalance)}
              </h3>
            </Grid>

            <Grid item xs={6} style={{ paddingRight: '20px' }}>
              <Box style={{ padding: '10px', textAlign: 'left' }}>
                <p style={{ color: 'white' }}>
                  Purchase BBond
                  <span style={{ float: 'right' }}>
                    <Button
                      onClick={() => {
                        onPresentP();
                      }}
                      disabled={!bondStat || isBondRedeemable}
                      style={{
                        border: 'solid 2px',
                        borderRadius: '20px',
                        marginRight: '20px',
                        textTransform: 'capitalize',
                      }}
                    >
                      Purchase <img alt="Shopping cart" style={{ width: '20px', marginLeft: '10px' }} src={CartImage} />
                    </Button>
                  </span>
                </p>
                <p style={{ fontSize: '0.9rem' }}>Bomb is over peg</p>
                <hr style={{ border: '0.5px solid rgba(199, 195, 200, 0.8)' }} />

                <p style={{ color: 'white' }}>
                  Redeem Bond
                  <span style={{ float: 'right' }}>
                    <StyledButton
                      onClick={() => {
                        onPresentR();
                      }}
                      disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                      style={{ border: 'solid 2px', borderRadius: '20px', marginRight: '20px' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <div>Redeem</div>
                        <div>
                          <img alt="Withdraw icon" style={{ width: '20px', marginLeft: '10px' }} src={WithdrawImage} />
                        </div>
                      </div>
                    </StyledButton>
                  </span>
                </p>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Bonds;
