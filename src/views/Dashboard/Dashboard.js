import React, { useMemo } from 'react';
import HomeImage from '../../assets/img/dashboard_background.png';
import { createGlobalStyle } from 'styled-components';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';
import UnlockWallet from '../../components/UnlockWallet';
import BombFinanceSummary from './components/BombFinanceSummary';
import { useWallet } from 'use-wallet';
import useBombFinance from '../../hooks/useBombFinance';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import BoardroomNews from './components/BoardroomNews';
import BombFarms from './components/BombFarmsSection';
import Bonds from './components/BondsSection';
import LatestNews from './components/LatestNews';
import NewsTicker from './components/NewsTicker';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat;
    background-size: cover !important;
    background-color: #171923;
    color:white;
    background-attachment: scroll;
  min-height: 50vh;
  }
`;

const TITLE = 'bomb.money | Dashboard';
const Dashboard = () => {
  //token stats
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const bBondStats = useBondStats();
  const bombFinance = useBombFinance();
  const { account } = useWallet();
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCurrentSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCurrentSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const bBondPriceInDollars = useMemo(
    () => (bBondStats ? Number(bBondStats.priceInDollars).toFixed(2) : null),
    [bBondStats],
  );
  const bBondPriceInBNB = useMemo(() => (bBondStats ? Number(bBondStats.tokenInFtm).toFixed(4) : null), [bBondStats]);
  const bBondCurrentSupply = useMemo(() => (bBondStats ? String(bBondStats.circulatingSupply) : null), [bBondStats]);
  const bBondTotalSupply = useMemo(() => (bBondStats ? String(bBondStats.totalSupply) : null), [bBondStats]);

  //supplies of all tokens
  const details = {
    bomb: {
      currentSupply: bombCurrentSupply,
      totalSupply: bombTotalSupply,
      price: { indollar: bombPriceInDollars, inbnb: bombPriceInBNB },
    },
    bshare: {
      currentSupply: bShareCurrentSupply,
      totalSupply: bShareTotalSupply,
      price: { indollar: bSharePriceInDollars, inbnb: bSharePriceInBNB },
    },
    bbond: {
      currentSupply: bBondCurrentSupply,
      totalSupply: bBondTotalSupply,
      price: { indollar: bBondPriceInDollars, inbnb: bBondPriceInBNB },
    },
  };

  return (
    //shows dashboard only when account is connected
    <Switch>
      <Page>
        <BackgroundImage />
        <title>{TITLE}</title>
        {!!account ? (
          <>
            <div>
              <BombFinanceSummary details={details} bombFinance={bombFinance} />
            </div>
            <div>
              <BoardroomNews /> 
            </div>
            <div>
              <BombFarms />
            </div>
            <div>
              <Bonds />
            </div>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

export default Dashboard;
