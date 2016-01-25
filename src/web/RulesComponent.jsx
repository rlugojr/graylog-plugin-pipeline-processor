import React, {PropTypes} from 'react';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { Input, Alert } from 'react-bootstrap';

import RulesActions from 'RulesActions';
import RuleForm from 'RuleForm';
import Rule from 'Rule';

const RulesComponent = React.createClass({
  propTypes: {
    rules: PropTypes.array.isRequired,
  },

  _formatRule(rule) {
    return <Rule key={"rule-" + rule.id}
                 rule={rule}
                 user={this.props.user}
                 delete={this._delete}
                 save={this._save}
                 validateName={this._validateName}/>;
  },

  _sortByTitle(rule1, rule2) {
    return rule1.title.localeCompare(rule2.title);
  },

  _save(rule, callback) {
    console.log(rule);
    if (rule.id) {
      RulesActions.update(rule);
    } else {
      RulesActions.save(rule);
    }
    callback();
  },

  _delete(rule) {
    RulesActions.delete(rule.id);
  },

  // TODO this should really validate the rule (as in parsing it server side)
  _validateName(name) {
    return true;
  },

  render() {
    let rules;
    if (this.props.rules.length == 0) {
      rules =
        <Alert bsStyle='warning'>
          <i className="fa fa-info-circle" />&nbsp; No rules configured.
      </Alert>
    } else {
      rules = this.props.rules.sort(this._sortByTitle).map(this._formatRule);
    }

    return (
      <Row className="content">
        <Col md={12}>
          <h2>Rules</h2>
          <ul>
            {rules}
          </ul>
          <RuleForm create
                    save={this._save}
                    validateName={this._validateName}/>
        </Col>
      </Row>
    );
  },
});

export default RulesComponent;