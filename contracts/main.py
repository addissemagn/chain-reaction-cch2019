from boa.interop.System.Storage import Put, GetContext, Get, Delete
from boa.interop.System.Runtime import CheckWitness, Notify, Serialize, Deserialize, GetTime, Notify, Log
from boa.builtins import concat
from boa.interop.Ontology.Native import Invoke

PERSON_KEY = "PERSON_"
MAP_KEY = "MAP_"
CPR_KEY = "CPR_"

CPR_LIST_KEY = 'cpr_persons_list'
PERSONS_LIST_KEY = 'persons_list'

INCIDENT_LIST_KEY='incident_list'

def Main(operation, args):
    if operation == "Hello":
        msg = args[0]
        return Hello(msg)
    elif operation == "RegisterPerson":
        person_id = args[0]
        if len(args) > 1:
            cpr_cert = args[1]
        else:
            cpr_cert = ""
        return RegisterPerson(person_id, cpr_cert)
    elif operation == "VerifyPerson":
        cpr_cert = args[0]
        return VerifyPerson(cpr_cert)
    elif operation == "CertifyPerson":
        person_id = args[0]
        cpr_cert = args[1]
        return CertifyPerson(person_id, cpr_cert)
    elif operation == "RecordIncident":
        lat = args[0]
        lon = args[1]
        if len(args) > 2:
            emergency_type = args[2]
        return RecordIncident(lat, lon, emergency_type)
    elif operation == 'GetCprOwner':
        cpr_cert = args[0]
        return GetCprOwner(cpr_cert)

    return False

def RegisterPerson(person_id, phone_number, cpr_cert=""):
    ctx = GetContext()

    cpr_status = cpr_cert and VerifyPerson(cpr_cert)
    Notify('verified')
    person = {'cpr': cpr_status}
    Put(ctx, PERSON_KEY + person_id, Serialize(person))

    if cpr_status:
        # create persons list
        cpr_persons_list = Get(ctx, CPR_LIST_KEY)
        Notify(['in cpr_status', CPR_LIST_KEY])
        if cpr_persons_list is not None:
            cpr_persons_list = Deserialize(cpr_persons_list)
        else:
            cpr_persons_list = []
        cpr_persons_list.append([person_id, phone_number])

        Put(ctx, CPR_LIST_KEY, Serialize(cpr_persons_list))
    
    
    # persons_list = Get(ctx, PERSONS_LIST_KEY)
    # if persons_list is not None:
    #     persons_list = Deserialize(persons_list)
    # else:
    #     persons_list = []
    # persons_list.append(person_id)
    # Notify('Persons List')
    # Put(ctx, PERSONS_LIST_KEY, Serialize(persons_list))

    return True

def VerifyPerson(cpr_cert):
    owner = Get(GetContext(), CPR_KEY + cpr_cert)
    is_owner = CheckWitness(owner)
    Notify(is_owner)
    return is_owner

def CertifyPerson(person_id, cpr_cert):
    owner = Get(GetContext(), CPR_KEY + cpr_cert)
    # if owner is not None:
    #     # Error: certificate already belongs to someone else
    #     return False
    # else:
    Put(GetContext(), CPR_KEY + cpr_cert, person_id)
    return True

def GetCprOwner(cpr_cert):
    Notify(Get(GetContext(), CPR_KEY + cpr_cert))
    return True
    
def RecordIncident(lat, lon, owner, emergency_type="cpr"):
    context = GetContext()
    # occupy = Get(context, owner)
    # if occupy != None:
        # return False;
        
    position = [lat, lon]
    incident_list = Get(context, INCIDENT_LIST_KEY)
    if incident_list is not None:
        incident_list = Deserialize(incident_list)
    else:
        incident_list = []
    incident_list.append([emergency_type, position])
    
    Put(context, INCIDENT_LIST_KEY, Serialize(incident_list))
    
    NotifyResponders(emergency_type, position)
    
    Notify(['Register', position, emergency_type, owner])
    return True

def NotifyResponders(emergency_type, position):
    cpr_persons_list = Get(GetContext(), CPR_LIST_KEY)
    cpr_persons_list = Deserialize(cpr_persons_list)
    
    for i in range(len(cpr_persons_list)):
        Notify(['Alert:', position, cpr_persons_list[i]])
    
    return True
    
def Hello(msg):
    Notify(msg)
    return True