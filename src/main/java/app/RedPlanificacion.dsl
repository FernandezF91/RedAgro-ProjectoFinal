<?xml version="1.0" encoding="ISO-8859-1"?>
<smile version="1.0" id="VentureBN" numsamples="1000">
<nodes>
<cpt id="Success">
<state id="Success" />
<state id="Failure" />
<probabilities>0.2 0.8</probabilities>
</cpt>
<cpt id="Forecast">
<state id="Good" />
<state id="Moderate" />
<state id="Poor" />
<parents>Success</parents>
<probabilities>
0.4 0.4 0.2 0.1 0.3 0.6
</probabilities>
</cpt>
</nodes>
<extensions>
<genie version="1.0" app="GeNIe 2.1.1104.2"
name="VentureBN"
faultnameformat="nodestate">
<node id="Success">
<name>Success of the venture</name>
<interior color="e5f6f7" />
<outline color="0000bb" />
<font color="000000" name="Arial" size="8" />
<position>54 11 138 62</position>
</node>
<node id="Forecast">
<name>Expert forecast</name>
<interior color="e5f6f7" />
<outline color="0000bb" />
<font color="000000" name="Arial" size="8" />
<position>63 105 130 155</position>
</node>
</genie>
</extensions>
</smile>
