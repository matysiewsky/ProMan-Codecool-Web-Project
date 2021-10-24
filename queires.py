import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ORDER BY id
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ORDER BY id
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_new_board(board_title):
    query = f"""
        INSERT INTO boards (title)
        VALUES (%s) 
        """

    return data_manager.execute_dml_statement(query, [board_title])


def edit_board_title(board_title, board_id):
    query = f"""
        UPDATE boards
        SET title = %s
        WHERE id = %s;        
        """
    return data_manager.execute_dml_statement(query, [board_title, board_id])


def edit_card_title(card_title, card_id):
    query = f"""
        UPDATE cards
        SET title = %s
        WHERE id = %s;        
        """
    return data_manager.execute_dml_statement(query, [card_title, card_id])


def add_new_card(card_title, status_id, card_order, board_id):
    query = f"""
        INSERT INTO cards (title, card_order, status_id, board_id)
        VALUES (%s, %s, %s, %s) 
        RETURNING id;
        """
    return data_manager.execute_dml_statement(query, [card_title, status_id, card_order, board_id])


def get_card(card_id):
    """
    Find the first card matching the given id
    :param card_id:
    """
    card = data_manager.execute_select(
        """
        SELECT * FROM cards c
        WHERE c.id = %(card_id)s
        ;
        """
        , {"card_id": card_id})
    return card


def delete_card(card_id):
    """
    delete the card matching the given id
    :param card_id:
    """
    query = f"""
            DELETE FROM cards
            WHERE id = %s;
            """
    return data_manager.execute_dml_statement(query, [card_id])
