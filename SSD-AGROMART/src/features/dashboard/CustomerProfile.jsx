import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const CustomerProfile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="pb-5">
      <h3 className="fw-bold mb-4">{t('customer.profile.title')}</h3>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">{t('customer.profile.account_settings')}</h5>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">{t('customer.profile.full_name')}</label>
                  <input type="text" className="form-control" defaultValue={user?.name} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">{t('customer.profile.email_address')}</label>
                  <input type="email" className="form-control" defaultValue={user?.email} disabled />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">{t('customer.profile.phone_number')}</label>
                  <input type="text" className="form-control" defaultValue="+91 9876543210" />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">{t('customer.profile.location')}</label>
                  <input type="text" className="form-control" defaultValue="Nagpur, Maharashtra" />
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-success px-4 rounded-pill fw-bold">
                    {t('customer.profile.save_changes')}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="card border-0 shadow-sm p-4 mt-4">
            <h5 className="fw-bold mb-4">{t('customer.profile.security')}</h5>
            <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-3">
              <div>
                <h6 className="fw-bold mb-1">{t('customer.profile.password')}</h6>
                <small className="text-muted">{t('customer.profile.password_last_changed')}</small>
              </div>
              <button className="btn btn-outline-success btn-sm rounded-pill px-3">{t('customer.profile.update')}</button>
            </div>
            <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
              <div>
                <h6 className="fw-bold mb-1">{t('customer.profile.two_factor_auth')}</h6>
                <small className="text-muted">{t('customer.profile.mfa_desc')}</small>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <div className="position-relative d-inline-block mx-auto mb-3">
              <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                <i className="bi bi-person-fill text-success display-1"></i>
              </div>
              <button className="btn btn-success btn-sm rounded-circle position-absolute bottom-0 end-0 border-white border-2 shadow-sm">
                <i className="bi bi-camera"></i>
              </button>
            </div>
            <h5 className="fw-bold mb-1">{user?.name}</h5>
            <p className="text-muted small mb-3">{user?.role}</p>
            <button className="btn btn-light btn-sm w-100 rounded-pill">{t('customer.profile.edit_photo')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CustomerProfile;
