# from sqlalchemy.sql.functions import ReturnTypeFromArgs

# class unaccent(ReturnTypeFromArgs):
#     pass

def check_location(id):
    letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    id = str(id).upper()  
    if id in letters:
            return(id)    
    return('0')