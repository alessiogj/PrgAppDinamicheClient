import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/formatDate';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from 'react-number-format';

const EditPanel = ({
  editElement,
  displayNames,
  handleInputChange,
  handleConfirmEdit,
  handleConfirmDelete,
  onCancel,
  type,
}) => {
  const handleNumberInputChange = (key, value) => {
    const parsedValue = parseFloat(value);
    handleInputChange(key, !isNaN(parsedValue) ? parsedValue.toFixed(2) : '');
  };

  const handleDateChange = (key, date) => {
    handleInputChange(key, date ? formatDate(date) : '');
  };

  const renderTextField = (key) => (
    <Grid item xs={12} sm={6} key={key}>
      <TextField
        fullWidth
        label={displayNames[key]}
        value={editElement[key] || 'N/A'}
        InputProps={{
          readOnly: true,
          style: { color: 'gray' },
        }}
        variant="outlined"
      />
    </Grid>
  );

  const renderDateField = (key) => (
    <Grid item xs={12} sm={6} key={key}>
      <DatePicker
        selected={editElement[key] ? new Date(editElement[key]) : null}
        onChange={(date) => handleDateChange(key, date)}
        customInput={
          <TextField fullWidth label={displayNames[key]} variant="outlined" />
        }
        dateFormat="yyyy-MM-dd"
      />
    </Grid>
  );

  const renderNumberField = (key) => (
    <Grid item xs={12} sm={6} key={key}>
      <NumericFormat
        fullWidth
        label={displayNames[key]}
        value={editElement[key] || ''}
        customInput={TextField}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        prefix={'€'}
        onValueChange={(values) => handleNumberInputChange(key, values.value)}
      />
    </Grid>
  );

  const renderDescriptionField = (key) => (
    <Grid item xs={12} key={key}>
      <TextField
        fullWidth
        label={displayNames[key]}
        value={editElement[key] || ''}
        onChange={(e) => handleInputChange(key, e.target.value)}
        multiline
        rows={4}
        variant="outlined"
      />
    </Grid>
  );

  return (
    <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom tabIndex={0}>
        Modifica Ordine
      </Typography>
      <Grid container spacing={3}>
        {['ord_num', 'agent_code', 'cust_code'].map(renderTextField)}

        {Object.keys(editElement).map((key) => {
          if (key === 'ord_date') return renderDateField(key);
          if (key === 'ord_amount' || key === 'advance_amount')
            return renderNumberField(key);
          if (key === 'ord_description') return renderDescriptionField(key);
          return null;
        })}
      </Grid>
      <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
        {type === 'agent' && (
          <Grid item>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="secondary"
            >
              Cancella
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={handleConfirmEdit}
            variant="contained"
            color="primary"
          >
            Conferma
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={onCancel} variant="contained" color="tertiary">
            Chiudi
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

EditPanel.propTypes = {
  editElement: PropTypes.object.isRequired,
  displayNames: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleConfirmEdit: PropTypes.func.isRequired,
  handleConfirmDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default EditPanel;
