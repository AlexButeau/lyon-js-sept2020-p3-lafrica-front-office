import React, { useContext, useEffect } from 'react';
import './CampaignsView.css';
import { FaMicrophone } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import API from '../../services/API';

import { UserContext } from '../../context/UserContext';

const CampaignsView = () => {
  moment.locale('fr');

  const history = useHistory();

  const {
    userDetails,
    setUserDetails,
    setLoggedIn,
    campaignsList,
    setCampaignsList,
  } = useContext(UserContext);

  useEffect(() => {
    if (userDetails) {
      API.get(`/users/${userDetails.id}/campaigns`)
        .then((res) => setCampaignsList(res.data))
        .catch(() => {
          setLoggedIn(false);
          setUserDetails({});
        });
    }
  }, [userDetails]);

  const showCampaignsList = () => {
    return campaignsList.map((campaign) => {
      return (
        <tr key={campaign.id}>
          <td className="no-border">
            <BiSearchAlt2
              className="search-icon"
              onClick={() => history.push(`/campaigns/${campaign.id}`)}
            />
          </td>
          <td className="stylized-td">{campaign.firstname}</td>
          <td className="stylized-td">{campaign.lastname}</td>
          <td className="stylized-td">{campaign.name}</td>
          <td className="stylized-td">
            {moment(campaign.date).format('DD/MM/YYYY HH:mm')}
          </td>
          <td className="stylized-td">
            {campaign.sending_status ? (
              <div className="cell-campaign-status">
                <span className="status finished-status" />
                <p>Envoyée</p>
              </div>
            ) : (
              <div className="cell-campaign-status">
                <span className="status in-progress-status" />
                <p>En attente</p>
              </div>
            )}
          </td>
          <td className="same-width-than-search-icon no-border" />
        </tr>
      );
    });
  };

  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <FaMicrophone className="microphone-icon" />
            <h2>Liste des Campagnes</h2>
          </div>
        </div>
      </article>
      <article>
        <div className="campaigns-list">
          <div className="filter-container">
            <p>Voir pour système de filtre et de tri</p>
          </div>
          <table>
            <thead>
              <tr>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />

                <th className="stylized-th">PrenomClt</th>
                <th className="stylized-th">Nom Client</th>
                <th className="stylized-th">Nom Campagne</th>
                <th className="stylized-th">Date d'envoi</th>
                <th className="stylized-th">Statut</th>
              </tr>
            </thead>
            <tbody>{showCampaignsList()}</tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default CampaignsView;