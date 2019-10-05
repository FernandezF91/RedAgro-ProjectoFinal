net Unnamed
{
 HEADER = 
  {
   ID = Unnamed;
   NAME = "DatosDiscretosRed";
   COMMENT = "";
  };
 CREATION = 
  {
  };
 NUMSAMPLES = 1000;
 SCREEN = 
  {
   POSITION = 
    {
     CENTER_X = 0;
     CENTER_Y = 0;
     WIDTH = 76;
     HEIGHT = 36;
    };
   COLOR = 16250597;
   SELCOLOR = 12303291;
   FONT = 1;
   FONTCOLOR = 0;
   BORDERTHICKNESS = 3;
   BORDERCOLOR = 12255232;
  };
 WINDOWPOSITION = 
  {
   CENTER_X = 0;
   CENTER_Y = 0;
   WIDTH = 0;
   HEIGHT = 0;
  };
 BKCOLOR = 16777215;
 USER_PROPERTIES = 
  {
  };
 DOCUMENTATION = 
  {
  };
 SHOWAS = 3;

 node Ventas
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = Ventas;
     NAME = "Ventas";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 438;
       CENTER_Y = 184;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 8454143;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = ();
   DEFINITION = 
    {
     NAMESTATES = (ventasMinimas, ventasModeradas, ventasMayor);
     PROBABILITIES = (0.33295465, 0.33323866, 0.33380668);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0, 0);
     FAULT_NAMES = ("", "", "");
     FAULT_LABELS = ("", "", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "", "");
     STATEREPAIRINFO = ("", "", "");
     QUESTION = "";
    };
  };

 node TipoAlimento
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = TipoAlimento;
     NAME = "TipoAlimento";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 712;
       CENTER_Y = 349;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 16250597;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = (Ventas);
   DEFINITION = 
    {
     NAMESTATES = (Frutas, Verduras);
     PROBABILITIES = (0.52131287, 0.47868713, 0.44676320, 0.55323680, 
     0.23256803, 0.76743197);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0);
     FAULT_NAMES = ("", "");
     FAULT_LABELS = ("", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "");
     STATEREPAIRINFO = ("", "");
     QUESTION = "";
    };
  };

 node Alimento
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = Alimento;
     NAME = "Alimento";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 418;
       CENTER_Y = 458;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 16250597;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = (TipoAlimento, Ventas);
   DEFINITION = 
    {
     NAMESTATES = (Ajo, Banana, Batata, SCebolla_blanca, Frutillas, SManzana_roja
     , SNaranja_jugo, SPapa_negra, SPimiento_Rojo, Tomate);
     PROBABILITIES = (0.00016340, 0.21748366, 0.00016340, 0.00016340, 
     0.34656863, 0.11454248, 0.32042484, 0.00016340, 0.00016340, 
     0.00016340, 0.00019048, 0.33923810, 0.00019048, 0.00019048, 
     0.14876190, 0.31828571, 0.19257143, 0.00019048, 0.00019048, 
     0.00019048, 0.00036496, 0.15000000, 0.00036496, 0.00036496, 
     0.22664234, 0.42007299, 0.20109489, 0.00036496, 0.00036496, 
     0.00036496, 0.08202847, 0.00017794, 0.09270463, 0.08558719, 
     0.00017794, 0.00017794, 0.00017794, 0.24395018, 0.18879004, 
     0.30622776, 0.14630769, 0.00015385, 0.22015385, 0.15553846, 
     0.00015385, 0.00015385, 0.00015385, 0.10323077, 0.22938462, 
     0.14476923, 0.23377630, 0.00011074, 0.17397564, 0.22491694, 
     0.00011074, 0.00011074, 0.00011074, 0.16400886, 0.10753045, 
     0.09534884);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
     FAULT_NAMES = ("", "", "", "", "", "", "", "", "", "");
     FAULT_LABELS = ("", "", "", "", "", "", "", "", "", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "", "", "", "", "", "", "", "", "");
     STATEREPAIRINFO = ("", "", "", "", "", "", "", "", "", "");
     QUESTION = "";
    };
  };

 node provincia
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = provincia;
     NAME = "provincia";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 168;
       CENTER_Y = 299;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 16250597;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = (Alimento, Ventas);
   DEFINITION = 
    {
     NAMESTATES = (SBuenos_Aires, CABA, NEUQUEN, TUCUMAN);
     PROBABILITIES = (0.26063830, 0.47340426, 0.26063830, 0.00531915, 
     0.10677083, 0.09635417, 0.41927083, 0.37760417, 0.31250000, 
     0.27004717, 0.17099057, 0.24646226, 0.24067164, 0.03171642, 
     0.36007463, 0.36753731, 0.21368715, 0.34217877, 0.22486034, 
     0.21927374, 0.43452381, 0.55357143, 0.00595238, 0.00595238, 
     0.45754717, 0.40094340, 0.04245283, 0.09905660, 0.14756944, 
     0.23784722, 0.37673611, 0.23784722, 0.27373418, 0.21044304, 
     0.20411392, 0.31170886, 0.29081633, 0.33163265, 0.00510204, 
     0.37244898, 0.25735294, 0.45343137, 0.22794118, 0.06127451, 
     0.23651961, 0.12867647, 0.31985294, 0.31495098, 0.22183099, 
     0.20774648, 0.23591549, 0.33450704, 0.24367089, 0.05379747, 
     0.48417722, 0.21835443, 0.35317460, 0.63888889, 0.00396825, 
     0.00396825, 0.45422535, 0.38380282, 0.10211268, 0.05985915, 
     0.13839286, 0.27529762, 0.34672619, 0.23958333, 0.28663793, 
     0.13146552, 0.20043103, 0.38146552, 0.29568528, 0.20431472, 
     0.30583756, 0.19416244, 0.08088235, 0.26715686, 0.27696078, 
     0.37500000, 0.39732143, 0.37946429, 0.00446429, 0.21875000, 
     0.19746377, 0.19021739, 0.29891304, 0.31340580, 0.25367647, 
     0.29779412, 0.10661765, 0.34191176, 0.29697987, 0.28355705, 
     0.27013423, 0.14932886, 0.14252336, 0.22663551, 0.39485981, 
     0.23598131, 0.26833333, 0.32166667, 0.20833333, 0.20166667, 
     0.33928571, 0.16581633, 0.15561224, 0.33928571, 0.12861272, 
     0.22109827, 0.38294798, 0.26734104, 0.46578947, 0.31842105, 
     0.00263158, 0.21315789, 0.25574713, 0.23275862, 0.25574713, 
     0.25574713);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0, 0, 0);
     FAULT_NAMES = ("", "", "", "");
     FAULT_LABELS = ("", "", "", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "", "", "");
     STATEREPAIRINFO = ("", "", "", "");
     QUESTION = "";
    };
  };

 node periodo
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = periodo;
     NAME = "periodo";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 173;
       CENTER_Y = 77;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 16250597;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = (Alimento, Ventas);
   DEFINITION = 
    {
     NAMESTATES = (Invierno, Otono, Primavera, Verano);
     PROBABILITIES = (0.00531915, 0.00531915, 0.09042553, 0.89893617, 
     0.06510417, 0.02343750, 0.42968750, 0.48177083, 0.38797170, 
     0.40683962, 0.20400943, 0.00117925, 0.09888060, 0.09888060, 
     0.52425373, 0.27798507, 0.38128492, 0.38128492, 0.10195531, 
     0.13547486, 0.17261905, 0.17261905, 0.00595238, 0.64880952, 
     0.00471698, 0.70283019, 0.04245283, 0.25000000, 0.04340278, 
     0.16840278, 0.31423611, 0.47395833, 0.52056962, 0.17246835, 
     0.26107595, 0.04588608, 0.00510204, 0.00510204, 0.00510204, 
     0.98469388, 0.00245098, 0.32598039, 0.27696078, 0.39460784, 
     0.43259804, 0.27083333, 0.29534314, 0.00122549, 0.32981221, 
     0.05751174, 0.40492958, 0.20774648, 0.23101266, 0.73734177, 
     0.02848101, 0.00316456, 0.00396825, 0.28968254, 0.00396825, 
     0.70238095, 0.18661972, 0.03169014, 0.75000000, 0.03169014, 
     0.34077381, 0.22767857, 0.20982143, 0.22172619, 0.15732759, 
     0.41594828, 0.00215517, 0.42456897, 0.31598985, 0.24492386, 
     0.43781726, 0.00126904, 0.25735294, 0.39460784, 0.02205882, 
     0.32598039, 0.00446429, 0.00446429, 0.00446429, 0.98660714, 
     0.26992754, 0.32065217, 0.32065217, 0.08876812, 0.10661765, 
     0.00367647, 0.03308824, 0.85661765, 0.29697987, 0.29697987, 
     0.28355705, 0.12248322, 0.19859813, 0.02102804, 0.75934579, 
     0.02102804, 0.44833333, 0.24833333, 0.04833333, 0.25500000, 
     0.00255102, 0.50255102, 0.00255102, 0.49234694, 0.24421965, 
     0.24421965, 0.51011561, 0.00144509, 0.48684211, 0.48684211, 
     0.00263158, 0.02368421, 0.00287356, 0.00287356, 0.00287356, 
     0.99137931);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0, 0, 0);
     FAULT_NAMES = ("", "", "", "");
     FAULT_LABELS = ("", "", "", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "", "", "");
     STATEREPAIRINFO = ("", "", "", "");
     QUESTION = "";
    };
  };

 node temperatura
  {
   TYPE = CPT;
   HEADER = 
    {
     ID = temperatura;
     NAME = "temperatura";
    };
   SCREEN = 
    {
     POSITION = 
      {
       CENTER_X = 660;
       CENTER_Y = 89;
       WIDTH = 72;
       HEIGHT = 48;
      };
     COLOR = 16250597;
     SELCOLOR = 12303291;
     FONT = 1;
     FONTCOLOR = 0;
     BORDERTHICKNESS = 1;
     BORDERCOLOR = 8388608;
    };
   USER_PROPERTIES = 
    {
    };
   DOCUMENTATION = 
    {
    };
   PARENTS = (periodo, Ventas);
   DEFINITION = 
    {
     NAMESTATES = (temp1_below_14, temp2_14_17, temp3_17_22, temp4_22_up
     );
     PROBABILITIES = (0.88899614, 0.10907336, 0.00096525, 0.00096525, 
     0.89817881, 0.10016556, 0.00082781, 0.00082781, 0.87344720, 
     0.12500000, 0.00077640, 0.00077640, 0.16542289, 0.34950249, 
     0.29477612, 0.19029851, 0.17074928, 0.30619597, 0.28025937, 
     0.24279539, 0.16791045, 0.35000000, 0.26641791, 0.21567164, 
     0.00048544, 0.38300971, 0.61601942, 0.00048544, 0.00138122, 
     0.39917127, 0.59806630, 0.00138122, 0.00133690, 0.39705882, 
     0.60026738, 0.00133690, 0.00124378, 0.00124378, 0.17039801, 
     0.82711443, 0.00072046, 0.00072046, 0.19668588, 0.80187320, 
     0.00074627, 0.00074627, 0.13208955, 0.86641791);
    };
   EXTRA_DEFINITION = 
    {
     DIAGNOSIS_TYPE = AUXILIARY;
     RANKED = FALSE;
     MANDATORY = FALSE;
     SETASDEFAULT = FALSE;
     SHOWAS = 4;
     FAULT_STATES = (0, 0, 0, 0);
     FAULT_NAMES = ("", "", "", "");
     FAULT_LABELS = ("", "", "", "");
     DEFAULT_STATE = 0;
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     DOCUMENTATION = 
      {
      };
     STATECOMMENTS = ("", "", "", "");
     STATEREPAIRINFO = ("", "", "", "");
     QUESTION = "";
    };
  };
 OBSERVATION_COST = 
  {

   node Ventas
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };

   node TipoAlimento
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };

   node Alimento
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };

   node provincia
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };

   node periodo
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };

   node temperatura
    {
     PARENTS = ();
     COSTS = (0.00000000);
    };
  };
};
